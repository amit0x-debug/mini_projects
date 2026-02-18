import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os

# Create directory for plots if it doesn't exist
output_dir = "plots"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

def analyze_results(file_path):
    print(f"--- Loading data from {file_path} ---")

    # 1. Load CSV
    try:
        df = pd.read_csv(file_path)
    except FileNotFoundError:
        print("Error: CSV file not found.")
        return

    # 2. Identify subject columns (all columns except StudentID and Name)
    subject_cols = [col for col in df.columns if col not in ['StudentID', 'Name']]

    # 3. Calculate Total and Average using NumPy/Pandas
    df['Total'] = df[subject_cols].sum(axis=1)
    df['Average'] = df[subject_cols].mean(axis=1)

    # 4. Rank students based on Total marks
    df['Rank'] = df['Total'].rank(ascending=False, method='min').astype(int)

    # Sort by rank
    df = df.sort_values(by='Rank')

    # 5. Display the ranking table in terminal
    print("\n--- Student Rankings ---")
    print(df[['Rank', 'Name', 'Total', 'Average']].to_string(index=False))

    # 6. Data Visualizations

    # Plot 1: Student Performance (Average Marks)
    plt.figure(figsize=(10, 6))
    plt.bar(df['Name'], df['Average'], color='skyblue', edgecolor='navy')
    plt.xlabel('Student Name')
    plt.ylabel('Average Marks')
    plt.title('Student Average Performance')
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'student_performance.png'))
    plt.close()

    # Plot 2: Subject Averages
    subject_avgs = df[subject_cols].mean()
    plt.figure(figsize=(8, 8))
    plt.pie(subject_avgs, labels=subject_cols, autopct='%1.1f%%', startangle=140, colors=plt.cm.Paired.colors)
    plt.title('Average Performance Across Subjects')
    plt.savefig(os.path.join(output_dir, 'subject_distribution.png'))
    plt.close()

    # 7. Save results to a new CSV
    output_csv = 'student_results_analysis.csv'
    df.to_csv(output_csv, index=False)
    print(f"\nAnalysis complete. Results saved to '{output_csv}' and plots saved in '{output_dir}/'.")

if __name__ == "__main__":
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(BASE_DIR, "students.csv")
    analyze_results(file_path)
