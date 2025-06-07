import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "Insertion Sort",
    type: "ArrayFrame",
    complexity: {
        time: "O(n²)",
        space: "O(1)",
    },
    dataTypes: ["Arrays, Linked Lists"],
    definition:(<>
        Insertion Sort is a simple comparison-based sorting algorithm that builds the final sorted array one element at a time. It works by iteratively consuming one input element and inserting it into its correct position within the sorted portion of the array. The algorithm is efficient for small datasets and nearly sorted arrays.
    </>),
    constraints:(
        <ul className="list-disc list-inside">
            <li>Inefficient for large random datasets due to O(n²) time complexity</li>
            <li>Excellent performance for small arrays (typically n ≤ 10)</li>
            <li>Highly efficient for nearly-sorted or already-sorted data (O(n))</li>
            <li>Often used as the base case for hybrid sorting algorithms</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
            <li>Array to be sorted - <CodeSnippet code="array"/></li>  
            <li>Current key element being inserted - <CodeSnippet code="key"/></li>  
            <li>Index for sorted portion - <CodeSnippet code="j"/></li>  
            <li>Boundary between sorted/unsorted portions - <CodeSnippet code="i"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
            <li>Start with the second element (index 1) as the initial key</li>
            <li>Compare the key with elements in the sorted portion (to its left):</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>Shift elements greater than the key one position right</li>
                <li>Continue until finding an element ≤ key or reaching array start</li>
            </ul>
            <li>Insert the key into its correct position in the sorted portion</li>
            <li>Move to the next unsorted element and repeat the process</li>
            <li>After each iteration, the sorted portion grows by one element</li>
            <li>Algorithm completes when all elements are processed</li>
        </ul>
    ),
    returns:(<>
        Returns nothing (sorts <CodeSnippet code="array"/> in-place)<br/>
        Modifies the original array instead of returning a new one<br/>
        No explicit return value (void function in most implementations)
    </>),
    languages: [
        {
            language: "C++",
            machineLanguage: "cpp",
            iterative: `#include <vector>
#include <iostream>

void insertionSort(std::vector<int>& arr) {
    int n = (int)arr.size();
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;

        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }

        arr[j + 1] = key;
    }
}
`,
            recursive: `#include <vector>
#include <iostream>

void insertionSort(std::vector<int>& arr, int n) {
    // Base case: one element is always sorted
    if (n <= 1)
        return;

    // Sort first n-1 elements
    insertionSort(arr, n - 1);

    // Insert the last element into the sorted part
    int last = arr[n - 1];
    int j = n - 2;

    while (j >= 0 && arr[j] > last) {
        arr[j + 1] = arr[j];
        --j;
    }

    arr[j + 1] = last;
}
`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1

        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = key
`,
            recursive: `def insertion_sort(arr, n=None):
    if n is None:
        n = len(arr)

    # Base case
    if n <= 1:
        return

    # Sort first n-1 elements
    insertion_sort(arr, n - 1)

    # Insert last element into sorted subarray
    last = arr[n - 1]
    j = n - 2

    while j >= 0 and arr[j] > last:
        arr[j + 1] = arr[j]
        j -= 1

    arr[j + 1] = last
`
        }
    ]
}

export default description;