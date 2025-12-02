import java.util.HashSet;

/*
    Runtime: 14ms
    Memory: 93.58MB

    Time complexity: O(n)
    Space complexity: O(n)
 */

/*
    Solution One consists of a single-pass approach through nums where we use a HASH_SET to store unique elements (nums[i]).
     On each iteration, we check:
        1) Is nums[i] already in nums_set?
        --> If yes, we have a seen a repeated element (nums[i]) -> RETURN true
        --> If not, we add nums[i] to nums_set
    If we traverse all of nums and have not come across a duplicate (end of loop) -> RETURN false.
 */
public class SolutionOne {
    public boolean containsDuplicate(int[] nums) {
        HashSet<Integer> nums_set = new HashSet<>();

        for (int i = 0; i < nums.length; i++) {
            if (nums_set.contains(nums[i])) {
                return true;
            } else {
                nums_set.add(nums[i]);
            }
        }

        return false;
    }
}