import java.util.HashMap;

public class SolutionOne {

    /*
        Runtime: ms
        Memory: MB
     */
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        HashMap<Character, Integer> sMap = new HashMap<>();
        HashMap<Character, Integer> tMap = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            if (!sMap.containsKey(s.charAt(i))) {
                sMap.put(s.charAt(i), 1);
            } else {
                int currentFreq = sMap.get(s.charAt(i));
                sMap.put(s.charAt(i), currentFreq++);
            }
        }

        for (int i = 0; i < t.length(); i++) {
            if (!tMap.containsKey(t.charAt(i))) {
                tMap.put(t.charAt(i), 1);
            } else {
                int currentFreq = tMap.get(t.charAt(i));
                tMap.put(t.charAt(i), currentFreq++);
            }
        }

        for (int i = 0; i < s.length(); i++) {
            if (tMap.get(s.charAt(i)) != sMap.get(s.charAt(i))) {
                return false;
            }
        }

        return true;
    }
}