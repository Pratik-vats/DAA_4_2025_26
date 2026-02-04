#include <bits/stdc++.h>
#define MAX 100
using namespace std;

int heap[MAX];
int heapSize = 0;
int K = 3;

void deleteMin();

void heapifyDown(int i){
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < heapSize && heap[left] < heap[smallest])
        smallest = left;
    if (right < heapSize && heap[right] < heap[smallest])
        smallest = right;

    if (smallest != i)
    {
        swap(heap[i], heap[smallest]);
        heapifyDown(smallest);
    }
}

void heapifyUp(int i){
    while (i > 0 && heap[(i - 1) / 2] > heap[i])
    {
        swap(heap[i], heap[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

void insert(int val){
    heap[heapSize] = val;
    heapSize++;
    heapifyUp(heapSize - 1);

    if (heapSize > K)
        deleteMin();
}

void deleteMin(){
    heap[0] = heap[heapSize - 1];
    heapSize--;
    heapifyDown(0);
}

int main(){
    int scores[] = {10, 20, 5, 15, 25, 8};
    int n = 6;

    for (int i = 0; i < n; i++)
    {
        insert(scores[i]);

        if (heapSize < K)
            cout << -1 << endl;
        else
            cout << heap[0] << endl;
    }
}
