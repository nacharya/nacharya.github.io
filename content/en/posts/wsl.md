+++
author = "nacharya"
title = "WSLv2 and Windows 10 Pro"
date = "2021-01-17"
description = "Installing and using Ubuntu in WSLv2 "
tags = [
    "WSL",
    "Ubuntu",
]
+++

## Installing WSLv2 on Windows and using Linux natively on Windows

### Pre-requisites

- **Windows 10 May 2020 (2004)**
- or  **Windows 10 May 2019 (1903)**
- or **Windows 10 November 2019 (1909)** or later
- Computer with Hyper-V support for virtualization

***Pathces*** : If you have Windows revisions 1903 or 1909 make sure you can install the
patches: [Windows Update KB4566116](https://support.microsoft.com/en-us/help/4566116/windows-10-update-kb4566116)

## 1. WSL has to be enabled

Once the installation is complete, please enable the WSL using the following Powershell

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

## 2. Enable Virtual Machine Support

Once you have a comouter with Hyper-V hardware support, enable the Virtual machine Support
in Windows 10 (1903 or 1909) with the following Powershell

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform -NoRestart
```

## 3. WSLv2 should be the default

As of writing this document in Jan 2021, best version option to be made default in Windows
should be 2. Set it accordingly using Powershell

```powershell
wsl --set-default-version 2
```

## 4. Install Ubuntu 20.04

Linux distros are now available in the Microsoft Store App for Windows . Look for
`Ubuntu 20.04` and install it. Following link will also get you there

[Ubuntu 20.04 LTS in the Microsoft Store](https://www.microsoft.com/en-gb/p/ubuntu-2004-lts/9n6svws3rx71)

## 5. Install Windows Terminal

Windows Terminal is also available in the Microsoft Store App. Following link will get you there

[Windows Terminal in the Microsoft Store](https://www.microsoft.com/en-gb/p/windows-terminal/9n0dx20hk701)

## 6. Using Ubuntu

Start the Windows Terminal Application. At the top bar of the Terminal right next to the `+` sign there is
anoher sign with `🠋`
Select that and Choose `Ubuntu`.  It wil take you directly to a bash shell

```bash
user@mypc./mnt/c/home/user %
```

## 7. Check the running wsl

Got back to the running terminal the using the following command to look at the current status
of the running WSLv2

```powershell
C:/> wsl -v -l 
```
