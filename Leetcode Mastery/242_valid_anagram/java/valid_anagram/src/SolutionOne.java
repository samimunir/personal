import java.util.HashMap;

public class SolutionOne {

    /*
        Runtime: 31ms
        Memory: 45.08MB

        Time complexity: O(n)
        Space complexity: O(1)
     */
    
    /*
        Solution One consists of a clever approach where we are told that strings s & t are only comprised of lowercase-English letters. The other logical assertion we can make is that if len(s) != len(t), they are not valid anagrams by definition.
        
        So we can attain a constant-time space-complexity by creating a HashMap chars_map which tracks the frequency/rather keeps a balance check between the occurences of each character in s & t.
        
        We can do so by incrementing the frequency of a seen character in s, and decrementing the frequency of a seen character in t. 

        At the end, we can see whether or not all values (frequencies) of the alphabet chars_map are 0. This means s and t frequencies balanced out and they are valid anagrams. If any values contain anything other than 0s, then s & t are not valid anagrams.
     */
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        HashMap<Character, Integer> chars_map = new HashMap<>();
        for (int i = 97; i < 123; i++) {
            chars_map.put((char) i, 0);
        }

        int n = s.length();

        for (int i = 0; i < n; i++) {
            if (chars_map.containsKey(s.charAt(i))) {
                int freq = chars_map.get(s.charAt(i));
                freq++;
                chars_map.replace(s.charAt(i), freq);
            }

            if (chars_map.containsKey(t.charAt(i))) {
                int freq = chars_map.get(t.charAt(i));
                freq--;
                chars_map.replace(t.charAt(i), freq);
            }
        }

        Object[] binary_chars = chars_map.values().toArray();

        for (int i = 0; i < binary_chars.length; i++) {
            if ((int) binary_chars[i] != 0) {
                return false;
            }
        }

        return true;
    }
}