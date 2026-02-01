#!/bin/bash

# Function to grant execution permission to files
grant_execution_permission() {
    local directory="$1"
    
    # Check if the directory exists
    if [ ! -d "$directory" ]; then
        echo "Error: Directory '$directory' not found."
        exit 1
    fi

    # Find all files (excluding directories) in the specified directory and its subdirectories
    find "$directory" -type f | while read -r file; do
        # Grant execution permission to each file
        #chmod +x "$file"
        #file=find /home/user -name "*.sh"
        git update-index --chmod=+x "$file"
        echo "Execution permission granted to: $file"
    done

    echo "Execution permission granted to all files in '$directory' and its subdirectories."
}

# Check if the directory argument is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

# Call the function with the provided directory
grant_execution_permission "$1"
