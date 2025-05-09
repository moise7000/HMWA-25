import os

def rename(repo, prefix):
    
    if not os.path.isdir(repo):
        print(f"The repo {repo} does not exist.")
        return

    i = 0
    for file_name in os.listdir(repo):

        if file_name != "rename.py":
            file_path = os.path.join(repo, file_name)


            if os.path.isfile(file_path):

                new_file_name = prefix + str(i)
                new_file_path = os.path.join(repo, new_file_name)


                os.rename(file_path, new_file_path)
                print(f"Renamed: {file_name} -> {new_file_name}")
                i+=1


repo = '.'
prefix = 'yoga_course_'
rename(repo, prefix)
