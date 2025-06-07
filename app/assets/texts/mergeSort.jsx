import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "Merge Sort",
    type: "ArrayFrame",
    complexity: {
        time: "O(n log n)",
        space: "O(n)",
    },
    dataTypes: ["Arrays, Linked Lists"],
    definition:(<>
        Merge Sort is a divide-and-conquer sorting algorithm that recursively splits an array into halves until each subarray contains a single element, then merges them back together in sorted order. The key operation is the merge step, which combines two sorted subarrays into a single sorted array by comparing elements from each subarray and selecting the smaller one at each step.
    </>),
    constraints:(
        <ul className="list-disc list-inside">
            <li>Requires additional O(n) space for the merging process</li>
            <li>Slower than Quick Sort for small datasets due to recursion overhead</li>
            <li>Excellent for linked lists as it doesn't require random access</li>
            <li>Stable sort (maintains relative order of equal elements)</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
            <li>Array to be sorted - <CodeSnippet code="array"/></li>  
            <li>Left index of subarray - <CodeSnippet code="left"/></li>  
            <li>Right index of subarray - <CodeSnippet code="right"/></li>  
            <li>Temporary array for merging - <CodeSnippet code="tempArray"/></li>  
            <li>Left subarray (sorted) - <CodeSnippet code="leftArray"/></li>  
            <li>Right subarray (sorted) - <CodeSnippet code="rightArray"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
            <li>Divide the unsorted array into two halves at the middle index</li>
            <li>Recursively sort the left half <CodeSnippet code="array[left..mid]"/></li>
            <li>Recursively sort the right half <CodeSnippet code="array[mid+1..right]"/></li>
            <li>Merge the two sorted halves back together:</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>Compare elements from both halves one by one</li>
                <li>Always take the smaller element and place it in the merged array</li>
                <li>Continue until all elements from both halves are merged</li>
            </ul>
            <li>Repeat until the entire array is sorted</li>
        </ul>
    ),
    returns:(<>
        Returns nothing (sorts <CodeSnippet code="array"/> in-place in most implementations)<br/>
        Some implementations may return a new sorted array while leaving the original unchanged<br/>
        No explicit return value (void function in most in-place implementations)
    </>),
    languages: [
        {
            language: "C++",
            machineLanguage: "cpp",
            iterative: `#include <vector>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    std::vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; ++i) L[i] = arr[left + i];
    for (int j = 0; j < n2; ++j) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr) {
    int n = (int)arr.size();
    for (int curr_size = 1; curr_size <= n - 1; curr_size *= 2) {
        for (int left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            int mid = std::min(left_start + curr_size - 1, n - 1);
            int right_end = std::min(left_start + 2 * curr_size - 1, n - 1);
            merge(arr, left_start, mid, right_end);
        }
    }
}
`,
            recursive: `#include <vector>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    std::vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; ++i) L[i] = arr[left + i];
    for (int j = 0; j < n2; ++j) R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `def merge_sort(arr):
    width = 1
    n = len(arr)
    result = arr[:]

    while width < n:
        for i in range(0, n, 2 * width):
            left = result[i:i + width]
            right = result[i + width:i + 2 * width]
            merged = merge(left, right)
            result[i:i + len(merged)] = merged
        width *= 2

    return result`,
            recursive: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result`
        }
    ]
}

export default description;