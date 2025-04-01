@echo off
REM scriptpush.cmd - Automates git add, commit, and push operations.


REM Add all changes (staged files and untracked files)
git add .

REM Ask for a commit message
set /p commit_message="Enter commit message: "

REM Commit the changes with the provided message
git commit -m "%commit_message%"

REM Push the changes to the default remote (usually origin)
git push

REM End the script
echo Changes pushed successfully!
pause