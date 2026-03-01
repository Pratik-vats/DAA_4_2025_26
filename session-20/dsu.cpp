#include <bits/stdc++.h>
using namespace std;

class DSU {
public:
    vector<int> parent;
    vector<int> size;

    DSU(int n) {
        parent.resize(n);
        size.resize(n);

        for(int i = 0; i < n; i++) {
            parent[i] = i;  
            size[i] = 1;    
        }
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
        }
        else {
            parent[py] = px;
            size[px] += size[py];
        }

        return true;
    }
};

int main() {

    int n = 4;  

    DSU dsu(n);

    vector<pair<int,int>> edges;
    edges.push_back({0,1});
    edges.push_back({1,2});
    edges.push_back({2,3});
    edges.push_back({3,1}); 

    for(int i = 0; i < edges.size(); i++) {

        int u = edges[i].first;
        int v = edges[i].second;

        if(!dsu.unite(u, v)) {
            cout << "Cycle detected\n";
            return 0;
        }
    }

    cout << "No cycle\n";

    return 0;
}