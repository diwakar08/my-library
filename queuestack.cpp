#include <iostream>
#include <stack>
#include <cstdlib>
using namespace std;

bool balanceParenthesis(const char* s, int n) {
    stack<char> st;
    for (int i = 0; i < n; i++) {
        if (s[i] == '(' || s[i] == '{' || s[i] == '[') {
            st.push(s[i]);
        } else if (s[i] == ')' || s[i] == '}' || s[i] == ']') {
            if (st.empty()) {
                return false;
            } else if ((s[i] == ')' && st.top() == '(') ||
                       (s[i] == '}' && st.top() == '{') ||
                       (s[i] == ']' && st.top() == '[')) {
                st.pop();
            } else {
                return false;
            }
        }
    }
    return st.empty();
}

int main() {
    cout << "Enter the size of the string: ";
    int n;
    cin >> n;

    cout << "Enter the parentheses to check if they are balanced: ";
    char* s = (char*)malloc(sizeof(char) * (n + 1));
    cin >> s;

    if (balanceParenthesis(s, n)) {
        cout << "Parentheses are balanced.\n";
    } else {
        cout << "Parentheses are not balanced.\n";
    }

    free(s);  // Deallocate the memory for the string

    return 0;
}
