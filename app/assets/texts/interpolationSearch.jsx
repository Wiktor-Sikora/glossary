import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "Interpolation Search",
    type: "ArrayFrameSorting",
    complexity: {
        time: "O(log log n)",
        space: "O(1)",
    },
    dataTypes: ["Arrays"],
    definition:(<>
         Interpolation search is an improved variant of binary search for uniformly distributed sorted arrays. Instead of always dividing the search space in half, it estimates the position of the target value using a formula that takes into account the value's relative position within the range of elements. This makes it particularly efficient for large, uniformly distributed datasets.
    </>),
    constraints:(
        <ul className="list-disc list-inside">
            <li>Data in an array must be sorted</li>
            <li>Elements should be uniformly distributed for optimal performance</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
            <li>target value - <CodeSnippet code="key"/></li>
            <li>Sorted array - <CodeSnippet code="array"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
            <li>Calculate the probable position using interpolation formula: <CodeSnippet code="pos = low + ((key - array[low]) * (high - low)) / (array[high] - array[low])"/></li>
            <li>Compare <CodeSnippet code="array[pos]"/> with <CodeSnippet code="key"/></li>
            <li>If <CodeSnippet code="array[pos]"/> is equal to <CodeSnippet code="key"/>, return its index</li>
            <li>If <CodeSnippet code="array[pos]"/> isn't equal to <CodeSnippet code="key"/>, choose next partition to be searched</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>If <CodeSnippet code="array[pos]"/> is bigger than <CodeSnippet code="key"/>, search the left partition</li>
                <li>If <CodeSnippet code="array[pos]"/> is smaller than <CodeSnippet code="key"/>, search the right partition</li>
            </ul>
            <li>Repeat until index of <CodeSnippet code="key"/> is found or search space is empty</li>
        </ul>
    ),
    returns:(<>
        Index of <CodeSnippet code="key"/> or <CodeSnippet code="-1"/> if not found
    </>),
    languages: [
        {
            language: "C++",
            machineLanguage: "cpp",
            iterative: `int interpolationSearch(int arr[], int n, int x) {
    int low = 0, high = n - 1;

    while (low <= high && x >= arr[low] && x <= arr[high]) {
        if (low == high) {
            if (arr[low] == x) return low;
            return -1;
        }

        int pos = low + ((double)(high - low) / (arr[high] - arr[low])) * (x - arr[low]);

        if (arr[pos] == x)
            return pos;
        if (arr[pos] < x)
            low = pos + 1;
        else
            high = pos - 1;
    }

    return -1;
}`,
            recursive: `int interpolationSearch(int arr[], int low, int high, int x) {
    if (low <= high && x >= arr[low] && x <= arr[high]) {
        if (low == high) {
            return (arr[low] == x) ? low : -1;
        }

        int pos = low + ((double)(high - low) / (arr[high] - arr[low])) * (x - arr[low]);

        if (arr[pos] == x)
            return pos;
        else if (arr[pos] < x)
            return interpolationSearch(arr, pos + 1, high, x);
        else
            return interpolationSearch(arr, low, pos - 1, x);
    }
    return -1;
}`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `def interpolation_search(arr, x):
    low, high = 0, len(arr) - 1

    while low <= high and x >= arr[low] and x <= arr[high]:
        if low == high:
            if arr[low] == x:
                return low
            return -1

        pos = low + int((float(high - low) / (arr[high] - arr[low])) * (x - arr[low]))

        if arr[pos] == x:
            return pos
        if arr[pos] < x:
            low = pos + 1
        else:
            high = pos - 1

    return -1`,
            recursive: `def interpolation_search(arr, low, high, x):
    if low <= high and x >= arr[low] and x <= arr[high]:
        if low == high:
            return low if arr[low] == x else -1

        pos = low + int((float(high - low) / (arr[high] - arr[low])) * (x - arr[low]))

        if arr[pos] == x:
            return pos
        elif arr[pos] < x:
            return interpolation_search(arr, pos + 1, high, x)
        else:
            return interpolation_search(arr, low, pos - 1, x)
    return -1`
        }
    ]
}

export default description;