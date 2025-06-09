import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "Jump Search",
    type: "ArrayFrameSorting",
    complexity: {
        time: "O(√n)",
        space: "O(1)",
    },
    dataTypes: ["Arrays"],
    definition:(<>
        Jump Search is a searching algorithm for sorted arrays that works by jumping ahead by fixed steps until an element greater than the target is found, then performing a linear search in the previous block. It offers better performance than linear search but requires the input to be sorted, similar to binary search.
    </>),
    constraints:(
        <ul className="list-disc list-inside">
            <li>Requires the input array to be <strong>sorted</strong> in ascending order</li>
            <li>Optimal jump size is √n, where n is the array length</li>
            <li>Performance sits between linear search (O(n)) and binary search (O(log n))</li>
            <li>Not suitable for unsorted or dynamically changing data</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
            <li>Sorted array to search - <CodeSnippet code="array"/></li>
            <li>Target value to find - <CodeSnippet code="target"/></li>
            <li>Optimal jump size - <CodeSnippet code="step = Math.floor(Math.sqrt(array.length))"/></li>
            <li>Current block start index - <CodeSnippet code="prev"/></li>
            <li>Current block end index - <CodeSnippet code="min(step, array.length)"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
            <li>Determine the optimal jump size (typically √n)</li>
            <li>Jump ahead in fixed steps through the array:</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>If current element &lt; target, continue jumping</li>
                <li>If current element ≥ target or end of array is reached, stop jumping</li>
            </ul>
            <li>Perform a linear search backward from the current position to the previous jump point</li>
            <li>Return the index if target is found, otherwise return -1</li>
        </ul>
    ),
    returns:(<>
        Returns the <strong>index</strong> of the target element if found<br/>
        Returns <CodeSnippet code="-1"/> if the target is not present in the array<br/>
        Only works on sorted arrays in ascending order
    </>),
    languages: [
        {
            language: "C++",
            machineLanguage: "cpp",
            iterative: `#include <vector>
#include <cmath>

int jumpSearch(const std::vector<int>& arr, int target) {
    int n = (int)arr.size();
    int step = (int)std::sqrt(n); // Optimal block size
    int prev = 0;

    // Jump in blocks until target is greater than or equal to arr[step]
    while (arr[std::min(step, n) - 1] < target) {
        prev = step;
        step += (int)std::sqrt(n);
        if (prev >= n)
            return -1;
    }

    // Linear search in the block
    for (int i = prev; i < std::min(step, n); ++i) {
        if (arr[i] == target)
            return i;
    }

    return -1;
}
`,
            recursive: `#include <vector>
#include <cmath>

int jumpSearch(const std::vector<int>& arr, int target, int prev, int step) {
    int n = (int)arr.size();

    if (prev >= n)
        return -1;

    // If target is greater, recurse to the next block
    if (arr[std::min(step, n) - 1] < target)
        return jumpSearch(arr, target, step, step + (int)std::sqrt(n));

    // Linear search in the block
    for (int i = prev; i < std::min(step, n); ++i) {
        if (arr[i] == target)
            return i;
    }

    return -1;
}
`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0

    # Jump in blocks until target is less than or equal to arr[step - 1]
    while prev < n and arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1

    # Linear search within the identified block
    for i in range(prev, min(step, n)):
        if arr[i] == target:
            return i

    return -1
`,
            recursive: `import math

def jump_search(arr, target, prev=0, step=None):
    n = len(arr)
    if step is None:
        step = int(math.sqrt(n))

    if prev >= n:
        return -1

    # If target is greater than last element in the current block
    if arr[min(step, n) - 1] < target:
        return jump_search(arr, target, step, step + int(math.sqrt(n)))

    # Linear search within the block
    for i in range(prev, min(step, n)):
        if arr[i] == target:
            return i

    return -1
`
        }
    ]
}

export default description;