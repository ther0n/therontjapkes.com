---
layout: post
title:  "Reading BitLocker Encrypted Drives on Linux"
---

On my desktop I have 4 drives: two solid state drives and two hard disk drives. Each solid state drive is dedicated to a single OS: one Windows 10 and the other the latest version of Fedora (currently 31). The two hard disk drives are dedicated to storage. The larger of the two is for general storage of music, photos, videos, and any other large files. The smaller drive contains my Steam library and large programs that don't need the speed of an SSD. I wanted to have all 4 drives encrypted because why not. VeraCrypt would work for this, but it isn't included in the Fedora or RPMFusion repos and I figured if I was going to spend the time getting something "unofficial" working it may as well be BitLocker which works seamlessly on the Windows side.

## Setting up BitLocker

First, I had to set up BitLocker from within Windows 10. A TPM is typically required for BitLocker to function properly however my motherboard doesn't have one built in. I could purchase one but TPM's frequently have vulnerabilities and would likely complicate the setup on the Fedora side later on. I wanted to only enter a single password at boot and end with the OS drive and the two HDDs unlocked, mounted, and ready to go for regardless of the OS booting. To allow BitLocker to be used without a TPM and have a password entered at boot instead you must run `gpedit.msc` and enable "Require additional authentication at startup" under "Local Computer Policy > Computer Configuration > Administrative Templates > Windows Components > BitLocker Drive Encryption > Operating System Drives". Once this is done you can enable BitLocker for `C:` and select "Enter a Password" when asked how to unlock the drive at startup. Once `C:` is encrypted I could enable BitLocker for the two HDDs and set them up to unlock at login. It took a while for the drives to be encrypted, once completed I could move on to Linux.

## Reading BitLocker Drives in Linux

When installing Fedora I checked the option to encrypt my installation with LUKS, which is the native way to encrypt a disk in Linux. To unlock BitLocker drives in Linux you need to use [Dislocker](https://github.com/Aorimn/dislocker). This can be installed from the Fedora repos, but the version there [didn't work for me](https://github.com/Aorimn/dislocker/issues/185). The solution was to build from source. I installed the required build dependencies and ran

{% highlight bash %}
{% raw %}
git clone https://github.com/Aorimn/dislocker.git
cd dislocker
cmake .
make
sudo make install
{% endraw %}
{% endhighlight %}

From there it was a matter of reading the documentation to get the drives mounted automatically on boot. For this you will need the recovery keys which you can export to a flash drive from BitLocker settings on Windows. First, I tested Dislocker by mounting my storage drive. Dislocker mounts the drive as a file which can then be mounted as a loop device. I'd need to create a location for the file, as well as a location to mount the loop device. I chose to mount the file to `/mnt/storage-bitlocker` and the loop device to `/media/storage`. In order to mount the drive, needed to find the device path for the drive, I found this by running `lsblk` and saw that `/dev/sdb1` is the device path for my storage disk. Running the following command unlocked the drive and mounted a file representing it's filesystem:

{% highlight bash %}
{% raw %}
sudo dislocker /dev/sdb1 -p123456-123456-123456-123456-123456-123456-123456-123456 -- /mnt/storage-bitlocker
{% endraw %}
{% endhighlight %}

If running this youself you'll need to replace `/dev/sdb1` with the device you want to mount and `123456-123456-123456-123456-123456-123456-123456-123456` with the BitLocker recovery key.

The next step is to mount the filesystem file as a loop device which I did with the following command:

{% highlight bash %}
{% raw %}
sudo mount -o loop /mnt/storage-bitlocker/dislocker-file /media/storage
{% endraw %}
{% endhighlight %}

I navigated to `/media/storage` and was able to read and write files as expected.

## Automatically Unlock and Mount the Drives at Boot

The next step is to add entries to do unlock and mount the drives automatically at boot by adding entries to the `/etc/fstab` file. My `fstab` entries look like this:

{% highlight bash %}
{% raw %}
# BitLocker
# Storage
/dev/sdb1 /mnt/storage-bitlocker fuse.dislocker recovery-password=123456-123456-123456-123456-123456-123456-123456-123456,nofail 0 0
/mnt/storage-bitlocker/dislocker-file /media/storage auto uid=1000,gid=1000,rw,user,exec,umask=000 0 0
# Programs
/dev/sdc1 /mnt/programs-bitlocker fuse.dislocker recovery-password=123456-123456-123456-123456-123456-123456-123456-123456,nofail 0 0
/mnt/programs-bitlocker/dislocker-file /media/programs auto uid=1000,gid=1000,rw,user,exec,umask=000 0 0
{% endraw %}
{% endhighlight %}

 Storing the recovery keys in plaintext isn't the greatest solution, but since they are stored on an encrypted disk I didn't see an issue. If you are following along yourself you will need to replace the device path and recovery password. The `uid=1000,gid=1000,rw,user,exec,umask=000` options are also important if you want to have proper permissions for the drive. Launching Windows games with Proton through Steam will not work for many games without these options. You will need to change the `uid` and `gid` options to match your users id, which can be found using `id -u` and `id -g`. Once I was finished editing the `fstab`, I rebooted since it's the easiest way to mount the drives with the new options and tests that it is working correctly.

## Sharing My Steam Library

Linux can run the Windows versions of nearly all games through the use of Proton, and in many cases Windows games in Proton perform better than the native linux versions. There are some issues running Windows games stored on an NTFS filesystem through Proton. [Luckily the Proton wiki page has instructions to make things work](https://github.com/ValveSoftware/Proton/wiki/Using-a-NTFS-disk-with-Linux-and-Windows). The above `fstab` instructions cover most of the requirements. To prevent windows from having issues, you must symlink the `/SteamLibrary/steamapps/compatdata` folder to the `compatdata` folder on you OS drive to prevent Proton from creating files with invalid names according to Windows. To do this you must install a Windows game to the OS drive and run it which creates a `compatdata` folder at `~/.steam/steam/steamapps/compatdata`. Once done, you can delete the game you installed and symlink the folder to your Steam library. In my case the following command did the trick: `ln -s ~/.steam/steam/steamapps/compatdata /media/programs/SteamLibrary/steamapps`. You will need to delete `/media/programs/SteamLibrary/steamapps/compatdata` if it already exists before running this command.

After doing this I am able to launch my Windows games that are stored on a Windows formatted NTFS filesystem that is encrypted by Windows BitLocker from Linux seamlessly. If a game doesn't work or perform well under Proton, I can simply reboot and run the game from the same location on Windows. I think that's pretty cool.
