int alphaLen = alphabet.length();
for (int i1 = 0; i1 < alphaLen; ++i1) {
    for (int i2 = 0; i2 < alphaLen; ++i2) {
        for (int i3 = 0; i3 < alphaLen; ++i3) {
            for (int i4 = 0; i4 < alphaLen; ++i4) {
                foo(alphabet.charAt(i1) + alphabet.charAt(i2) + alphabet.charAt(i3) + alphabet.charAt(i4));
            }
        }
    }
}