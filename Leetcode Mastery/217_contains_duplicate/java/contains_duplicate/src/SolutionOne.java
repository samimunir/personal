import java.util.HashSet;

/*
    Runtime: 15ms
    Memory: 93.55MB
 */

public class SolutionOne {
    public boolean containsDuplicate(int[] nums) {
        HashSet<Integer> numsMap = new HashSet<>();

        for (int i = 0; i < nums.length; i++) {
            if (!numsMap.contains(nums[i])) {
                numsMap.add(nums[i]);
            } else {
                return true;
            }
        }

        return false;
    }
}