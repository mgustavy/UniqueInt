#!/usr/bin/python3

import os
import re
import time

def parse_and_filter(source_file, output_file):

    """This method extracts unique integers from source file and writes them to the output file."""

    unique_integers = []

    with open(source_file, 'r') as f:
        for line in f:
            # Remove leading/trailing whitespace
            line = line.strip()

            # Skip empty lines or lines with multiple integers
            if not line or len(line.split()) > 1:
                continue

            # Use regex to match valid integers (positive or negative)
            match = re.match(r'^[-+]?\d+$', line)
            if match:
                num = int(line)
                # Check if the number is already in unique_integers
                if num not in unique_integers:
                    unique_integers.append(num)

    # Sort the unique integers
    for i in range(len(unique_integers)):
        for j in range(i + 1, len(unique_integers)):
            if unique_integers[i] > unique_integers[j]:
                unique_integers[i], unique_integers[j] = unique_integers[j], unique_integers[i]

    # Write the result to the output file
    with open(output_file, 'w') as f:
        for num in unique_integers:
            f.write(f"{num}\n")

def process_sample_folder(sample_folder, result_folder):
    """ The method processes all .txt files in the sample folder and creates corresponding result files in the result folder. """
    
    # Create the result folder if it doesn't exist
    if not os.path.exists(result_folder):
        os.makedirs(result_folder)

    # Process each file in the sample folder
    for filename in os.listdir(sample_folder):
        if filename.endswith('.txt'):
            input_path = os.path.join(sample_folder, filename)
            output_path = os.path.join(result_folder, f"{filename}_result")
            
            start_time = time.time()
            parse_and_filter(input_path, output_path)
            end_time = time.time()
            
            elapsed_time = end_time - start_time
            print(f"Processed {filename} in {elapsed_time:.4f} seconds")

# Usage
sample_folder = '../../sample_inputs'
result_folder = '../../sample_results'

global_start_time = time.perf_counter()
process_sample_folder(sample_folder, result_folder)
global_end_time = time.perf_counter()

total_execution_time = (global_end_time - global_start_time) * 1000
print(f"\nTotal processing time: {total_execution_time:.2f} milliseconds")