export const snippets = {
    binarySearch: {
        python: `def binarySearch(arr, low, high, x):
                
    while low <= high:

        mid = low + (high - low) // 2

        # Check if x is present at mid
        if arr[mid] == x:
            return mid

        # If x is greater, ignore left half
        elif arr[mid] < x:
            low = mid + 1

        # If x is smaller, ignore right half
        else:
            high = mid - 1

    # If we reach here, then the element was not present
    return -1`,
        
        pythonRec: `def binarySearch(arr, low, high, x):
    # Base case: element not found
    if low > high:
        return -1

    mid = low + (high - low) // 2

    # Check if x is present at mid
    if arr[mid] == x:
        return mid

    # If x is greater, search right half
    elif arr[mid] < x:
        return binarySearch(arr, mid + 1, high, x)

    # If x is smaller, search left half
    else:
        return binarySearch(arr, low, mid - 1, x)`,

        cpp: `int binarySearch(int arr[], int low, int high, int x) {

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Check if x is present at mid
            if (arr[mid] == x) {
                return mid;
            }
            // If x is greater, ignore left half
            else if (arr[mid] < x) {
                low = mid + 1;
            }
            // If x is smaller, ignore right half
            else {
                high = mid - 1;
            }
        }

        // If we reach here, then the element was not present
        return -1;
    }`,

        cppRec:`int binarySearch(int arr[], int low, int high, int x) {
        // Base case: element not found
        if (low > high) {
            return -1;
        }

        int mid = low + (high - low) / 2;

        // If element is found at mid
        if (arr[mid] == x) {
            return mid;
        }
        // If x is greater, search the right half
        else if (arr[mid] < x) {
            return binarySearch(arr, mid + 1, high, x);
        }
        // If x is smaller, search the left half
        else {
            return binarySearch(arr, low, mid - 1, x);
        }
    }  
        `
    }
}