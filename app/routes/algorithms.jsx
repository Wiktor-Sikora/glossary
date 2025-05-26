import CodeSnippet from "./baseArticle";

export const descriptions = {
     binarySearch: {
        title: "Binary Search",
        complexity: {
            time: "O(n)",
            space: "O(n)",
            type: "Array"
        },
        definition:(
            <>
            Binary search is a search algorithm that finds the position of a target value within a sorted array. Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half until it is successful. If the search ends with the remaining half being empty, the target is not in the array.
            </>
        ),
        constraints:(
            <ul className="list-disc list-inside">
                <li>Data in an array must be sorted</li>
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
                <li>Divide search space into two halves, by selecting middle index as <CodeSnippet code="mid"/></li>
                <li>Compare <CodeSnippet code="array[mid]"/> with <CodeSnippet code="key"/></li>
                <li>If <CodeSnippet code="array[mid]"/> is equal to <CodeSnippet code="key"/> return it's index</li>
                <li>If <CodeSnippet code="array[mid]"/> isn't equal to <CodeSnippet code="key"/>, choose next half to be searched</li>
                <ul className="ml-12 list-[circle] list-inside">
                    <li>If <CodeSnippet code="array[mid]"/> is bigger than <CodeSnippet code="key"/>, left side of an <CodeSnippet code="array"/> should be searched</li>
                    <li>If <CodeSnippet code="array[mid]"/> is smaller than <CodeSnippet code="key"/>, right side of an <CodeSnippet code="array"/> should be searched</li>
                </ul>
                <li>Repeat until index of <CodeSnippet code="key"/> is found or search space is empty</li>
            </ul>
        ),
        returns:(
            <>
            Index of <CodeSnippet code="key"/> or <CodeSnippet code="-1"/> if not found
            </>
        )
     }
}