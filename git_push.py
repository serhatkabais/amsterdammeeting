import subprocess
import os
import sys

print("=====================================================")
print("          DUTCH EDTECH - GIT COMMIT & PUSH           ")
print("=====================================================")

# 1. Initialize Git if needed
if not os.path.exists(".git"):
    print("[+] Initializing Git repository...")
    subprocess.run(["git", "init"], check=True)
else:
    print("[v] Git repository already initialized.")

# 2. Configure Git user locally
print("[+] Configuring local Git user...")
subprocess.run(["git", "config", "user.name", "Serhat Kabaiş"], check=True)
subprocess.run(["git", "config", "user.email", "serhat@edumanu.com"], check=True)

# 3. Add files and Commit
print("[+] Adding files to Git staging...")
subprocess.run(["git", "add", "."], check=True)

# Check status
status = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True)
if not status.stdout.strip():
    print("[v] Nothing to commit, working tree clean.")
else:
    print("[+] Committing changes...")
    subprocess.run(["git", "commit", "-m", "feat: setup Vercel deployment with Firebase database support"], check=True)

# 4. Ask for GitHub Remote URL
remotes = subprocess.run(["git", "remote"], capture_output=True, text=True)
has_origin = "origin" in remotes.stdout

remote_url = input("\nEnter your GitHub repository URL (e.g., https://github.com/serhatkabais/dutchedtech.git): ").strip()

if remote_url:
    # Set remote
    if has_origin:
        print("[+] Updating existing origin remote URL...")
        subprocess.run(["git", "remote", "set-url", "origin", remote_url], check=True)
    else:
        print("[+] Adding origin remote URL...")
        subprocess.run(["git", "remote", "add", "origin", remote_url], check=True)
        
    # Push to GitHub
    print("\n[+] Renaming branch to main...")
    subprocess.run(["git", "branch", "-M", "main"], check=True)
    
    print("[+] Pushing to GitHub (this may prompt you for credentials)...")
    try:
        subprocess.run(["git", "push", "-u", "origin", "main"], check=True)
        print("\n[v] Successfully pushed to GitHub!")
    except subprocess.CalledProcessError as e:
        print(f"\n[X] Push failed. If this is an authentication issue, you may need to log in to GitHub in your terminal or use Git Credential Manager.")
else:
    print("\n[-] No remote URL provided. Committed locally. You can push manually using:")
    print("    git remote add origin <your-repo-url>")
    print("    git branch -M main")
    print("    git push -u origin main")

print("=====================================================")
