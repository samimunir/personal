/*
    Leetcode #242 - Valid Anagram (Java)

    Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 */

public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("\nLeetcode #242 - Valid Anagram");
        System.out.println("------------------------------\n");

        SolutionOne sol = new SolutionOne();

        /*
            Example 1
            s = "anagram"
            t = "nagaram"
            Output: true
         */
        String s1 = "anagram";
        String t1 = "nagaram";
        System.out.println("Example 1 -->");
        System.out.println("s = " + s1);
        System.out.println("t = " + t1);
        System.out.println("Output: " + sol.isAnagram(s1, t1));

        /*
            Example 2
            s = "rat"
            t = "car"
            Output: false
         */
        String s2 = "rat";
        String t2 = "cat";
        System.out.println("\nExample 2 -->");
        System.out.println("s = " + s2);
        System.out.println("t = " + t2);
        System.out.println("Output: " + sol.isAnagram(s2, t2));

        /*
            Example 3
            s = "aacc"
            t = "ccac"
            Output: false
         */
        String s3 = "aacc";
        String t3 = "ccac";
        System.out.println("\nExample 3 -->");
        System.out.println("s = " + s3);
        System.out.println("t = " + t3);
        System.out.println("Output: " + sol.isAnagram(s3, t3));
    }
}
