#include <bits/stdc++.h>
using namespace std;

void heapifyUp(vector<int>& heap, int i) {
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (heap[parent] > heap[i]) {
            swap(heap[parent], heap[i]);
            i = parent;
        } else break;
    }
}

void heapifyDown(vector<int>& heap, int n, int i) {
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && heap[left] < heap[smallest])
        smallest = left;
    if (right < n && heap[right] < heap[smallest])
        smallest = right;

    if (smallest != i) {
        swap(heap[i], heap[smallest]);
        heapifyDown(heap, n, smallest);
    }
}

void deleteAtIndex(vector<int>& heap, int i) {
    int n = heap.size();
    if (i >= n) {
        cout << "Invalid index\n";
        return;
    }

    heap[i] = heap[n - 1];
    heap.pop_back();

    if (i > 0 && heap[i] < heap[(i - 1) / 2])
        heapifyUp(heap, i);
    else
        heapifyDown(heap, heap.size(), i);
}

int searchElement(vector<int>& heap, int key) {
    for (int i = 0; i < heap.size(); i++) {
        if (heap[i] == key)
            return i;
    }
    return -1;
}

void printHeap(vector<int>& heap) {
    for (int x : heap)
        cout << x << " ";
    cout << endl;
}

int main() {
    vector<int> heap = {10, 20, 30, 40, 50};

    cout << "Heap : ";
    printHeap(heap);
    cout << endl;

    int key = 20;
    int index = searchElement(heap, key);

    if (index != -1) {
        cout << "Element " << key << " found at index " << index << endl;
        deleteAtIndex(heap, index);
    } else {
        cout << "Element not found\n";
    }

    cout << "Heap after deletion: ";
    printHeap(heap);

    return 0;
}
