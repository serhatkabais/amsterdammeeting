import subprocess
import os
import shutil
import stat

print("=====================================================")
print("          DUTCH EDTECH - RECREATING GIT REPO         ")
print("=====================================================")

# 1. Safely remove .git folder on Windows (handling read-only files)
if os.path.exists(".git"):
    print("[+] Deleting old .git folder...")
    def remove_readonly(func, path, excinfo):
        os.chmod(path, stat.S_IWRITE)
        func(path)
    shutil.rmtree(".git", onerror=remove_readonly)
else:
    print("[✓] No .git folder found.")

# 2. Re-initialize Git
print("[+] Initializing clean Git repository...")
subprocess.run(["git", "init"], check=True)

# 3. Configure Git user locally
print("[+] Configuring local Git user...")
subprocess.run(["git", "config", "user.name", "Serhat Kabaiş"], check=True)
subprocess.run(["git", "config", "user.email", "serhat@edumanu.com"], check=True)

# 4. Re-add files (respecting .gitignore which ignores Kaynaklar/)
print("[+] Adding files (excluding ignored files)...")
subprocess.run(["git", "add", "."], check=True)

# 5. Commit
print("[+] Committing changes...")
subprocess.run(["git", "commit", "-m", "feat: setup Vercel deployment with Firebase database support"], check=True)

# 6. Set main branch and remote URL
print("[+] Renaming branch to main...")
subprocess.run(["git", "branch", "-M", "main"], check=True)

remote_url = "https://github.com/serhatkabais/amsterdammeeting"
print(f"[+] Setting remote origin to: {remote_url}")
subprocess.run(["git", "remote", "add", "origin", remote_url], check=True)

# 7. Push to GitHub
print("\n[+] Pushing clean repository to GitHub...")
try:
    # We use --force to overwrite any failed partial history on GitHub
    subprocess.run(["git", "push", "-u", "origin", "main", "--force"], check=True)
    print("\n[✓] Successfully pushed to GitHub!")
except subprocess.CalledProcessError as e:
    print("\n[X] Push failed. If this is an authentication issue, you may need to log in to GitHub in your terminal or use Git Credential Manager.")

print("=====================================================")
