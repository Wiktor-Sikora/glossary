import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "Heap Sort",
    type: "ArrayFrame",
    complexity: {
        time: "O(n log n)",
        space: "O(1)",
    },
    dataTypes: ["Arrays"],
    definition:(<>
        Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure to sort elements. It works by first transforming the array into a max-heap (where the parent node is always greater than its children), then repeatedly extracting the maximum element from the heap and rebuilding the heap until all elements are sorted.
    </>),
    constraints:(
        <ul className="list-disc list-inside">
             <li>Not a stable sort (does not maintain relative order of equal elements)</li>
            <li>Poor cache performance compared to Quick Sort and Merge Sort</li>
            <li>Efficient for large datasets but often slower in practice than Quick Sort</li>
            <li>Limited adaptability - doesn't take advantage of existing order in input</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
            <li>Array to be sorted - <CodeSnippet code="array"/></li>  
            <li>Heap size - <CodeSnippet code="heapSize"/></li>  
            <li>Current index in heap - <CodeSnippet code="i"/></li>  
            <li>Left child index - <CodeSnippet code="left"/></li>  
            <li>Right child index - <CodeSnippet code="right"/></li>  
            <li>Largest element index - <CodeSnippet code="largest"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
            <li>Build a max-heap from the input array:</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>Start from the last non-leaf node (parent of last element)</li>
                <li>Heapify each node to maintain max-heap property</li>
            </ul>
            <li>Repeatedly extract maximum element from heap:</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>Swap root (maximum element) with last element</li>
                <li>Reduce heap size by one (excluding sorted elements)</li>
                <li>Heapify the new root to maintain max-heap property</li>
            </ul>
            <li>Repeat extraction until heap contains only one element</li>
            <li>The array is now sorted in ascending order</li>
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
#include <algorithm> // for std::swap

void heapify(std::vector<int>& arr, int n, int i) {
    int current = i;

    while (true) {
        int largest = current;
        int left = 2 * current + 1;
        int right = 2 * current + 2;

        if (left < n && arr[left] > arr[largest])
            largest = left;
        if (right < n && arr[right] > arr[largest])
            largest = right;

        if (largest == current)
            break;

        std::swap(arr[current], arr[largest]);
        current = largest;
    }
}

void heapSort(std::vector<int>& arr) {
    int n = (int)arr.size();

    // Build heap (rearrange array)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Extract elements one by one from heap
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        std::swap(arr[0], arr[i]);

        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
}
`,
            recursive: `#include <vector>
#include <algorithm> // for std::swap

void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;       // root
    int left = 2 * i + 1;  // left child
    int right = 2 * i + 2; // right child

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    // If root is not largest, swap with largest and continue heapifying
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(std::vector<int>& arr) {
    int n = (int)arr.size();

    // Build heap (rearrange array)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        std::swap(arr[0], arr[i]);

        // Call heapify on the reduced heap
        heapify(arr, i, 0);
    }
}`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `def heapify(arr, n, i):
    current = i
    while True:
        largest = current
        left = 2 * current + 1
        right = 2 * current + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest == current:
            break

        arr[current], arr[largest] = arr[largest], arr[current]
        current = largest


def heap_sort(arr):
    n = len(arr)

    # Budujemy kopiec
    for i in range(n // 2 -1, -1, -1):
        heapify(arr, n, i)

    # Ekstrakcja elementów z kopca
    for i in range(n-1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
`,
            recursive: `def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)


def heap_sort(arr):
    n = len(arr)

    # Budujemy kopiec
    for i in range(n // 2 -1, -1, -1):
        heapify(arr, n, i)

    # Ekstrakcja elementów z kopca
    for i in range(n-1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
`
        }
    ]
}

export default description;