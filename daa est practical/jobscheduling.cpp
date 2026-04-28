#include <iostream>
#include <algorithm>
using namespace std;

class Job {
public:
    int id, deadline, profit;

    Job(int i, int d, int p) {
        id = i;
        deadline = d;
        profit = p;
    }
};

bool compare(Job a, Job b) {
    return a.profit > b.profit;
}

int maxProfit(Job jobs[], int n) {
    sort(jobs, jobs + n, compare);

    int maxDeadline = 0;
    for (int i = 0; i < n; i++) {
        maxDeadline = max(maxDeadline, jobs[i].deadline);
    }

    bool slot[maxDeadline + 1] = {false};

    int totalProfit = 0;

    for (int i = 0; i < n; i++) {
        for (int j = jobs[i].deadline; j > 0; j--) {
            if (!slot[j]) {
                slot[j] = true;
                totalProfit += jobs[i].profit;
                break;
            }
        }
    }

    return totalProfit;
}

int main() {
    Job jobs[] = {
        Job(1, 4, 20),
        Job(2, 1, 10),
        Job(3, 2, 40),
        Job(4, 2, 30)
    };

    int n = sizeof(jobs) / sizeof(jobs[0]);

    int result = maxProfit(jobs, n);

    cout << "Maximum profit: " << result << endl;

    return 0;
}