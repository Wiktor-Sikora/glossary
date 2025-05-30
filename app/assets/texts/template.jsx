import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "",
    complexity: {
        time: "O(n)",
        space: "O(n)",
    },
    dataTypes: ["Arrays"],
    definition:(<>

    </>),
    constraints:(
        <ul className="list-disc list-inside">
            <li>...</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
            <li>argument 1 - <CodeSnippet code="type"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
            <li>step 1</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>nested step</li>
            </ul>
        </ul>
    ),
    returns:(<>

    </>),
    languages: [
        {
            language: "C++",
            machineLanguage: "cpp",
            iterative: `...`,
            recursive: `...`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `...`,
            recursive: `...`
        }
    ]
}

export default description;