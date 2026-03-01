#include <bits/stdc++.h>
using namespace std;

class DSU {
public:
    vector<int> parent, size;

    DSU(int n) {
        parent.resize(n);
        size.resize(n, 1);

        for(int i = 0; i < n; i++)
            parent[i] = i;
    }

    int find(int x) {
        if(parent[x] == x)
            return x;

        parent[x] = find(parent[x]);
        return parent[x];
    }

    bool unite(int x, int y) {
        int px = find(x);
        int py = find(y);

        if(px == py)
            return false;

        if(size[px] < size[py]) {
            parent[px] = py;
            size[py] += size[px];
        } else {
            parent[py] = px;
            size[px] += size[py];
        }

        return true;
    }
};

int main() {

    int n = 4;

    vector<vector<int>> edges;

    edges.push_back({2,0,1});
    edges.push_back({3,0,3});
    edges.push_back({5,2,3});
    edges.push_back({6,0,2});
    edges.push_back({8,1,3});

    sort(edges.begin(), edges.end());

    DSU dsu(n);

    int mstWeight = 0;

    for(int i = 0; i < edges.size(); i++) {

        int weight = edges[i][0];
        int u = edges[i][1];
        int v = edges[i][2];

        if(dsu.unite(u, v)) {
            mstWeight += weight;
        }
    }

    cout << "Minimum Spanning Tree Weight: " << mstWeight;

    return 0;
}
