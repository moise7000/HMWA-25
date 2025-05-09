import os
import re

def rename(repo, prefix):
    if not os.path.isdir(repo):
        print(f"The repo {repo} does not exist.")
        return

    existing_numbers = set()
    pattern = re.compile(rf"^{re.escape(prefix)}(\d+)$")

    
    for file_name in os.listdir(repo):
        match = pattern.fullmatch(file_name)
        if match:
            existing_numbers.add(int(match.group(1)))

    i = 0
    for file_name in os.listdir(repo):
        if file_name == "rename.py":
            continue

        file_path = os.path.join(repo, file_name)

        
        if os.path.isfile(file_path) and not pattern.fullmatch(file_name):
        
            while i in existing_numbers:
                i += 1

            new_file_name = f"{prefix}{i}"
            new_file_path = os.path.join(repo, new_file_name)

            os.rename(file_path, new_file_path)
            print(f"Renamed: {file_name} -> {new_file_name}")
            existing_numbers.add(i)
            i += 1


repo = '.'
prefix = 'yoga_course_'
rename(repo, prefix)
