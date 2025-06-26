"use client";
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  RotateCcw,
  Save,
  Settings,
  ChevronLeft,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  Code,
  FileText,
  TestTube,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";

const ProblemSolverScreen = ({ problemName }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("description");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState("vs-dark");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [output, setOutput] = useState("");

  // Mock problem data - in a real app, this would come from an API
  const problemData = {
    "two-sum": {
      title: "Two Sum",
      difficulty: "Easy",
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
        },
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists.",
      ],
      starterCode: {
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your solution here
        
    }
};`,
        python: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your solution here
    pass`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your solution here
        
    }
}`,
      },
      testCases: [
        { input: "[2,7,11,15], 9", expected: "[0,1]" },
        { input: "[3,2,4], 6", expected: "[1,2]" },
        { input: "[3,3], 6", expected: "[0,1]" },
      ],
    },
    "binary-tree-maximum-path-sum": {
      title: "Binary Tree Maximum Path Sum",
      difficulty: "Hard",
      description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.`,
      examples: [
        {
          input: "root = [1,2,3]",
          output: "6",
          explanation:
            "The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.",
        },
        {
          input: "root = [-10,9,20,null,null,15,7]",
          output: "42",
          explanation:
            "The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.",
        },
      ],
      constraints: [
        "The number of nodes in the tree is in the range [1, 3 * 10^4].",
        "-1000 <= Node.val <= 1000",
      ],
      starterCode: {
        cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxPathSum(TreeNode* root) {
        // Your solution here
        
    }
};`,
        python: `# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution(object):
    def maxPathSum(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        # Your solution here
        pass`,
        java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int maxPathSum(TreeNode root) {
        // Your solution here
        
    }
}`,
      },
      testCases: [
        { input: "[1,2,3]", expected: "6" },
        { input: "[-10,9,20,null,null,15,7]", expected: "42" },
      ],
    },
    "longest-substring-without-repeating-characters": {
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      description: `Given a string s, find the length of the longest substring without repeating characters.`,
      examples: [
        {
          input: 's = "abcabcbb"',
          output: "3",
          explanation: 'The answer is "abc", with the length of 3.',
        },
        {
          input: 's = "bbbbb"',
          output: "1",
          explanation: 'The answer is "b", with the length of 1.',
        },
        {
          input: 's = "pwwkew"',
          output: "3",
          explanation: 'The answer is "wke", with the length of 3.',
        },
      ],
      constraints: [
        "0 <= s.length <= 5 * 10^4",
        "s consists of English letters, digits, symbols and spaces.",
      ],
      starterCode: {
        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Your solution here
        
    }
};`,
        python: `def lengthOfLongestSubstring(s):
    """
    :type s: str
    :rtype: int
    """
    # Your solution here
    pass`,
        java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your solution here
        
    }
}`,
      },
      testCases: [
        { input: '"abcabcbb"', expected: "3" },
        { input: '"bbbbb"', expected: "1" },
        { input: '"pwwkew"', expected: "3" },
      ],
    },
    "merge-k-sorted-lists": {
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
      examples: [
        {
          input: "lists = [[1,4,5],[1,3,4],[2,6]]",
          output: "[1,1,2,3,4,4,5,6]",
          explanation:
            "The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6",
        },
        {
          input: "lists = []",
          output: "[]",
          explanation: "",
        },
        {
          input: "lists = [[]]",
          output: "[]",
          explanation: "",
        },
      ],
      constraints: [
        "k == lists.length",
        "0 <= k <= 10^4",
        "0 <= lists[i].length <= 500",
        "-10^4 <= lists[i][j] <= 10^4",
        "lists[i] is sorted in ascending order.",
        "The sum of lists[i].length will not exceed 10^4.",
      ],
      starterCode: {
        cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        // Your solution here
        
    }
};`,
        python: `# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def mergeKLists(self, lists):
        """
        :type lists: List[ListNode]
        :rtype: ListNode
        """
        # Your solution here
        pass`,
        java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // Your solution here
        
    }
}`,
      },
      testCases: [
        { input: "[[1,4,5],[1,3,4],[2,6]]", expected: "[1,1,2,3,4,4,5,6]" },
        { input: "[]", expected: "[]" },
        { input: "[[]]", expected: "[]" },
      ],
    },
    "valid-parentheses": {
      title: "Valid Parentheses",
      difficulty: "Easy",
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
      examples: [
        {
          input: 's = "()"',
          output: "true",
          explanation: "",
        },
        {
          input: 's = "()[]{}"',
          output: "true",
          explanation: "",
        },
        {
          input: 's = "(]"',
          output: "false",
          explanation: "",
        },
      ],
      constraints: [
        "1 <= s.length <= 10^4",
        "s consists of parentheses only '()[]{}'.",
      ],
      starterCode: {
        cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your solution here
        
    }
};`,
        python: `def isValid(s):
    """
    :type s: str
    :rtype: bool
    """
    # Your solution here
    pass`,
        java: `class Solution {
    public boolean isValid(String s) {
        // Your solution here
        
    }
}`,
      },
      testCases: [
        { input: '"()"', expected: "true" },
        { input: '"()[]{}"', expected: "true" },
        { input: '"(]"', expected: "false" },
      ],
    },
    "house-robber": {
      title: "House Robber",
      difficulty: "Medium",
      description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
      examples: [
        {
          input: "nums = [1,2,3,1]",
          output: "4",
          explanation:
            "Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4.",
        },
        {
          input: "nums = [2,7,9,3,1]",
          output: "12",
          explanation:
            "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).\nTotal amount you can rob = 2 + 9 + 1 = 12.",
        },
      ],
      constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
      starterCode: {
        cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        // Your solution here
        
    }
};`,
        python: `def rob(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Your solution here
    pass`,
        java: `class Solution {
    public int rob(int[] nums) {
        // Your solution here
        
    }
}`,
      },
      testCases: [
        { input: "[1,2,3,1]", expected: "4" },
        { input: "[2,7,9,3,1]", expected: "12" },
      ],
    },
  };

  const currentProblem = problemData[problemName] || problemData["two-sum"];

  const getMonacoLanguage = (lang) => {
    switch (lang) {
      case "cpp":
        return "cpp";
      case "java":
        return "java";
      case "python":
        return "python";
      default:
        return "cpp";
    }
  };

  useEffect(() => {
    setCode(currentProblem.starterCode[language] || "");
  }, [language, problemName]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveTab("results");

    // Simulate code execution
    setTimeout(() => {
      const mockResults = currentProblem.testCases.map((testCase, index) => ({
        id: index + 1,
        input: testCase.input,
        expected: testCase.expected,
        actual: testCase.expected, // Mock: assume all pass
        passed: Math.random() > 0.3, // Randomly pass/fail for demo
        runtime: Math.floor(Math.random() * 50) + 10 + "ms",
        memory: Math.floor(Math.random() * 10) + 40 + "MB",
      }));

      setTestResults(mockResults);
      setOutput("Code executed successfully!");
      setIsRunning(false);
    }, 2000);
  };

  const handleResetCode = () => {
    setCode(currentProblem.starterCode[language] || "");
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-tea-green-600 bg-tea-green-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Hard":
        return "text-claret-600 bg-claret-100";
      default:
        return "text-onyx-600 bg-onyx-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="bg-white border-b border-alabaster-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/practice-hub")}
              className="flex items-center space-x-2 text-onyx-600 hover:text-claret-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="montserrat-medium">Back to Problems</span>
            </button>

            <div className="flex items-center space-x-3">
              <h1 className="text-xl montserrat-bold text-onyx-700">
                {currentProblem.title}
              </h1>
              <span
                className={`px-2 py-1 rounded-full text-xs montserrat-medium ${getDifficultyColor(
                  currentProblem.difficulty
                )}`}
              >
                {currentProblem.difficulty}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-2 border border-alabaster-300 rounded-lg focus:ring-2 focus:ring-claret-300 focus:border-claret-400 bg-white"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>

            <button
              onClick={handleResetCode}
              className="flex items-center space-x-2 px-3 py-2 text-onyx-600 hover:text-claret-600 border border-alabaster-300 rounded-lg hover:border-claret-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <Activity className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{isRunning ? "Running..." : "Run Code"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 border-r border-alabaster-200 bg-white">
          {/* Tabs */}
          <div className="flex border-b border-alabaster-200">
            {[
              {
                id: "description",
                label: "Description",
                icon: <FileText className="w-4 h-4" />,
              },
              {
                id: "examples",
                label: "Examples",
                icon: <Info className="w-4 h-4" />,
              },
              {
                id: "results",
                label: "Results",
                icon: <TestTube className="w-4 h-4" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-claret-500 text-claret-600 bg-claret-50"
                    : "border-transparent text-onyx-600 hover:text-claret-600 hover:bg-alabaster-50"
                }`}
              >
                {tab.icon}
                <span className="montserrat-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6 overflow-y-auto h-full">
            {activeTab === "description" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg montserrat-semibold text-onyx-700 mb-3">
                    Problem Description
                  </h2>
                  <div className="text-onyx-600 leading-relaxed whitespace-pre-line">
                    {currentProblem.description}
                  </div>
                </div>

                <div>
                  <h3 className="text-md montserrat-semibold text-onyx-700 mb-3">
                    Constraints
                  </h3>
                  <ul className="space-y-1">
                    {currentProblem.constraints.map((constraint, index) => (
                      <li key={index} className="text-onyx-600 text-sm">
                        • {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "examples" && (
              <div className="space-y-6">
                <h2 className="text-lg montserrat-semibold text-onyx-700">
                  Examples
                </h2>
                {currentProblem.examples.map((example, index) => (
                  <div key={index} className="bg-alabaster-50 p-4 rounded-lg">
                    <h4 className="montserrat-semibold text-onyx-700 mb-2">
                      Example {index + 1}:
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="montserrat-medium text-onyx-600">
                          Input:
                        </span>
                        <code className="ml-2 bg-onyx-100 px-2 py-1 rounded text-onyx-700">
                          {example.input}
                        </code>
                      </div>
                      <div>
                        <span className="montserrat-medium text-onyx-600">
                          Output:
                        </span>
                        <code className="ml-2 bg-onyx-100 px-2 py-1 rounded text-onyx-700">
                          {example.output}
                        </code>
                      </div>
                      {example.explanation && (
                        <div>
                          <span className="montserrat-medium text-onyx-600">
                            Explanation:
                          </span>
                          <span className="ml-2 text-onyx-600">
                            {example.explanation}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "results" && (
              <div className="space-y-4">
                <h2 className="text-lg montserrat-semibold text-onyx-700">
                  Test Results
                </h2>

                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-onyx-500">
                    <TestTube className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Run your code to see test results</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result) => (
                      <div
                        key={result.id}
                        className={`p-4 rounded-lg border ${
                          result.passed
                            ? "border-tea-green-200 bg-tea-green-50"
                            : "border-claret-200 bg-claret-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {result.passed ? (
                              <CheckCircle className="w-5 h-5 text-tea-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-claret-600" />
                            )}
                            <span className="montserrat-semibold">
                              Test Case {result.id}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-onyx-500">
                            <span>{result.runtime}</span>
                            <span>{result.memory}</span>
                          </div>
                        </div>

                        <div className="space-y-1 text-sm">
                          <div>
                            <span className="montserrat-medium">Input:</span>
                            <code className="ml-2 text-onyx-700">
                              {result.input}
                            </code>
                          </div>
                          <div>
                            <span className="montserrat-medium">Expected:</span>
                            <code className="ml-2 text-onyx-700">
                              {result.expected}
                            </code>
                          </div>
                          <div>
                            <span className="montserrat-medium">
                              Your Output:
                            </span>
                            <code
                              className={`ml-2 ${
                                result.passed
                                  ? "text-tea-green-700"
                                  : "text-claret-700"
                              }`}
                            >
                              {result.actual}
                            </code>
                          </div>
                        </div>
                      </div>
                    ))}

                    {output && (
                      <div className="bg-onyx-50 p-4 rounded-lg">
                        <h4 className="montserrat-semibold text-onyx-700 mb-2">
                          Output:
                        </h4>
                        <pre className="text-sm text-onyx-600">{output}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col bg-white">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-alabaster-200">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-onyx-600" />
              <span className="montserrat-medium text-onyx-700">
                Code Editor
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-2 py-1 text-sm border border-alabaster-300 rounded focus:ring-2 focus:ring-claret-300 focus:border-claret-400 bg-white"
              >
                <option value="vs-dark">Dark</option>
                <option value="light">Light</option>
                <option value="vs">VS Code</option>
              </select>

              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="px-2 py-1 text-sm border border-alabaster-300 rounded focus:ring-2 focus:ring-claret-300 focus:border-claret-400 bg-white"
              >
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
              </select>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1">
            <Editor
              height="100%"
              language={getMonacoLanguage(language)}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme={theme}
              options={{
                fontSize,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                wordWrap: "on",
                lineNumbers: "on",
                glyphMargin: false,
                folding: false,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolverScreen;
