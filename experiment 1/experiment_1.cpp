/*
Experiment 1:

// Q1. Write the recurrence relation for the given function.
Ans:

int p = n; while (p > 0) { vector<int> temp(n); for (int i = 0; i < n; i++) { temp[i] = i ^ p; } p >>= 1; }
outer loop-> log(n)
inside loop->n
total->O(nlogn)

vector<int> small(n); for (int i = 0; i < n; i++) { small[i] = i * i; }
time->O(n)
reverse(small.begin(), small.end());
time->O(n)
complexRec(n / 2); complexRec(n / 2); complexRec(n / 2);
recursive calls=3 times

together comes down to :  T(n)=3T(n/2)+O(nlogn)

*/
/*

// Q2. Using master theorem find asymptotic time complexity and clearly state which case of   theorem is applied?
Ans:

Here a=3, b=2
f(n)=O(nlogn)
k=1,p=0
Log(a) to base b=log(3) to base 2=1.58>k
Case 1: log(a) to base b>k
Time comp=O(n^log(a) to base b)=n^log(3)


*/

/*

// Q3. Modify given code to : 
a.	count the number of operations performed and depth of recursion tree
b.  measure the execution time (in milliseconds)
Ans:

#include <bits/stdc++.h>
using namespace std;
using namespace chrono;

int maxDepth = 0;

void complexRec(int n, int depth) {
    maxDepth = max(maxDepth, depth);

    if (n <= 2) {
        return;
    }

    int p = n;
    while (p > 0) {
        vector<int> temp(n);
        for (int i = 0; i < n; i++) {
            temp[i] = i ^ p;
        }
        p >>= 1;
    }

    vector<int> small(n);
    for (int i = 0; i < n; i++) {
        small[i] = i * i;
    }

    reverse(small.begin(), small.end());

    complexRec(n / 2, depth + 1);
    complexRec(n / 2, depth + 1);
    complexRec(n / 2, depth + 1);
}

int main() {
    vector<int> testSizes = {10, 20, 40, 80};

    for (int n : testSizes) {
        maxDepth = 0;

        auto start = high_resolution_clock::now();
        complexRec(n, 1);
        auto end = high_resolution_clock::now();

        auto duration = duration_cast<milliseconds>(end - start);

        cout << "n = " << n << endl;
        cout << "Max Recursion Depth: " << maxDepth << endl;
        cout << "Time Taken: " << duration.count() << " ms\n"<<endl;
    }

    return 0;
}


*/

#include<iostream>
using namespace std;
int main(){
    cout<<"hello world";
    cout<<"dsndskjfws;kdfj\n;";
    cout<<"dsndskjfws;kdfj\n;";
    cout<<"dsndskjfws;kdfj\n";
}