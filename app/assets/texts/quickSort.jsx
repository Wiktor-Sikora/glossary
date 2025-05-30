import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "Quick Sort",
    complexity: {
        time: "O(n log n)",
        space: "O(log n)",
    },
    dataTypes: ["Arrays"],
    definition:(<>
        Quick sort is a sorting algorithm that divides an array into smaller subarrays based on a pivot element. Quick sort selects a pivot, then partitions the array so that elements less than the pivot are on its left and elements greater than the pivot are on its right. The algorithm then recursively sorts the subarrays on either side of the pivot until the entire array is ordered. If a subarray has zero or one elements, it is already sorted and requires no further partitioning.
    </>),
    constraints:(
        <ul className="list-disc list-inside">
            <li>Performance depends heavily on pivot selection, as a bad pivot can degrade efficiency</li>
            <li>Not ideal for linked lists due to slow random access and poor cache performance during partitioning</li>
            <li>Recursive implementation can lead to stack overflow for very large arrays due to deep recursion</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
            <li>Array to be sorted - <CodeSnippet code="array"/></li>  
            <li>Starting index - <CodeSnippet code="low"/></li>  
            <li>Ending index - <CodeSnippet code="high"/></li>  
            <li>Pivot element - <CodeSnippet code="pivot"/></li>  
            <li>Left partition (elements ≤ pivot) - <CodeSnippet code="left"/></li>  
            <li>Right partition (elements {`>`} pivot) - <CodeSnippet code="right"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
            <li>Select a pivot element from the array, typically <CodeSnippet code="array[high]"/> or a random index</li>
            <li>Partition the array into two subarrays around the pivot:</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>Elements less than the pivot go to the left of <CodeSnippet code="pivot"/></li>
                <li>Elements greater than the pivot go to the right of <CodeSnippet code="pivot"/></li>
            </ul>
            <li>Recursively apply QuickSort to the left subarray <CodeSnippet code="array[low..pivotIndex - 1]"/></li>
            <li>Recursively apply QuickSort to the right subarray <CodeSnippet code="array[pivotIndex + 1..high]"/></li>
            <li>Repeat until subarrays have 0 or 1 element (base case)</li>
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
            iterative: `void quickSort(int arr[], int low, int high) {
    // Create a stack of pairs to store low and high indices
    std::stack<std::pair<int, int>> stack;
    
    // Push initial low and high to stack
    stack.push(std::make_pair(low, high));
    
    while (!stack.empty()) {
        // Pop low and high
        low = stack.top().first;
        high = stack.top().second;
        stack.pop();
        
        // Partition the array
        int pivot = arr[high]; // Choose last element as pivot
        int i = low - 1; // Index of smaller element
        
        for (int j = low; j <= high - 1; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++; // increment index of smaller element
                std::swap(arr[i], arr[j]);
            }
        }
        std::swap(arr[i + 1], arr[high]);
        int partitionIndex = i + 1;
        
        // Push subarrays to stack if they have more than one element
        if (partitionIndex - 1 > low) {
            stack.push(std::make_pair(low, partitionIndex - 1));
        }
        if (partitionIndex + 1 < high) {
            stack.push(std::make_pair(partitionIndex + 1, high));
        }
    }
}`,
            recursive: `int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // Choose last element as pivot
    int i = low - 1; // Index of smaller element
        
    for (int j = low; j <= high - 1; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++; // increment index of smaller element
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1; // Return the partition index
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // pi is partitioning index, arr[pi] is now at right place
        int pi = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Create a stack and push initial low and high
    stack = []
    stack.append((0, len(arr) - 1))
    
    while stack:
        low, high = stack.pop()
        
        # Partition process
        pivot = arr[high]
        i = low - 1
        
        for j in range(low, high):
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
        
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        partition_index = i + 1
        
        # Push subarrays to stack if they have more than one element
        if partition_index - 1 > low:
            stack.append((low, partition_index - 1))
        if partition_index + 1 < high:
            stack.append((partition_index + 1, high))
    
    return arr`,
            recursive: `def quick_sort(arr):
    # Base case: arrays with 0 or 1 element are already sorted
    if len(arr) <= 1:
        return arr
    
    # Choose pivot (here we pick the last element)
    pivot = arr[-1]
    
    # Partition the array into three parts
    left = [x for x in arr[:-1] if x <= pivot]  # Elements ≤ pivot
    right = [x for x in arr[:-1] if x > pivot]  # Elements > pivot
    
    # Recursively sort left and right, then combine with pivot
    return quick_sort(left) + [pivot] + quick_sort(right)`
        }
    ]
}

export default description;