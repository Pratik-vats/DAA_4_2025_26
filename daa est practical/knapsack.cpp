#include <iostream>
#include <algorithm>
using namespace std;

int knapsack(int capacity, int weights[], int values[], int n) {
    if (n == 0 || capacity == 0) {
        return 0;
    }

    if (weights[n - 1] > capacity) {
        return knapsack(capacity, weights, values, n - 1);
    }

    return max(
        values[n - 1] + knapsack(capacity - weights[n - 1], weights, values, n - 1),
        knapsack(capacity, weights, values, n - 1)
    );
}

int main() {
    int weights[] = {2, 3, 4, 5};
    int values[] = {3, 4, 5, 6};
    int capacity = 8;
    int n = sizeof(weights) / sizeof(weights[0]);

    int maxVal = knapsack(capacity, weights, values, n);

    cout << maxVal << endl;

    return 0;
}