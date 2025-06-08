import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "Bubble Sort",
    type: "ArrayFrame",
    complexity: {
        time: "O(n²)",
        space: "O(1)",
    },
    dataTypes: ["Arrays"],
    definition:(<>
        Bubble Sort is a simple comparison-based sorting algorithm. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. This process is repeated until the list is sorted.
    </>),
    constraints:(
        <ul className="list-disc list-inside">
            <li>Inefficient for large datasets due to O(n²) time complexity</li>
            <li>Generally performs worse than insertion sort in practice</li>
            <li>Adaptive version can optimize for nearly-sorted inputs</li>
            <li>Mostly used for educational purposes rather than production</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
           <li>Array to be sorted - <CodeSnippet code="array"/></li>  
            <li>Current index in pass - <CodeSnippet code="i"/></li>  
            <li>Flag for early termination - <CodeSnippet code="swapped"/></li>  
            <li>Number of passes completed - <CodeSnippet code="passCount"/></li>  
            <li>Temporary variable for swaps - <CodeSnippet code="temp"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
            <li>Start at the beginning of the array</li>
            <li>Compare each pair of adjacent elements:</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>If element at <CodeSnippet code="i"/> is greater than element at <CodeSnippet code="i+1"/>, swap them</li>
            </ul>
            <li>Continue comparing and swapping to the end of the array</li>
            <li>After each complete pass, the largest unsorted element "bubbles up" to its correct position</li>
            <li>Repeat process for remaining unsorted portion of array</li>
            <li>Optimization: Stop early if no swaps occurred in a pass (array is sorted)</li>
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
            iterative: `#include <iostream>
#include <vector>

void bubbleSortIterative(std::vector<int>& arr) {
    int n = (int)arr.size();
    for (int i = 0; i < n - 1; ++i) {
        // After i-th pass, the last i elements are in correct position
        for (int j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}
`,
            recursive: `#include <iostream>
#include <vector>

void bubbleSortRecursive(std::vector<int>& arr, int n) {
    // Base case: array size is 1
    if (n == 1)
        return;

    // One pass: push the largest element to the end
    for (int i = 0; i < n - 1; ++i) {
        if (arr[i] > arr[i + 1]) {
            std::swap(arr[i], arr[i + 1]);
        }
    }

    // Recursive call for the rest of the array
    bubbleSortRecursive(arr, n - 1);
}`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        # After each pass, the largest element is placed at the end
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
`,
            recursive: `def bubble_sort(arr, n=None):
    if n is None:
        n = len(arr)

    # Base case
    if n == 1:
        return

    # One pass to push the largest element to the end
    for i in range(n - 1):
        if arr[i] > arr[i + 1]:
            arr[i], arr[i + 1] = arr[i + 1], arr[i]

    # Recursive call for the rest of the array
    bubble_sort(arr, n - 1)
`
        }
    ]
}

export default description;