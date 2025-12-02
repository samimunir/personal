/*
    Leetcode #217 - Contains Duplicate (Java)

    Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
 */

import java.util.Arrays;

public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("\nLeetcode #217 - Contains Duplicate");
        System.out.println("-----------------------------------\n");

        SolutionOne s1 = new SolutionOne();

        /*
            Example 1
            nums = [1, 2, 3, 1]
            Output: true
         */
        int[] nums1 = {1, 2, 3, 1};
        System.out.println("Example 1 -->");
        System.out.println("nums: " + Arrays.toString(nums1));
        System.out.println("Output: " + s1.containsDuplicate(nums1));

        /*
            Example 2
            nums = [1, 2, 3, 4]
            Output: false
         */
        int[] nums2 = {1, 2, 3, 4};
        System.out.println("\nExample 2 -->");
        System.out.println("nums: " + Arrays.toString(nums2));
        System.out.println("Output: " + s1.containsDuplicate(nums2));

        /*
            Example 3
            nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
            Output: true
         */
        int[] nums3 = {1, 1, 1, 3, 3, 4, 3, 2, 4, 2};
        System.out.println("\nExample 3 -->");
        System.out.println("nums: " + Arrays.toString(nums3));
        System.out.println("Output: " + s1.containsDuplicate(nums3));
    }
}
