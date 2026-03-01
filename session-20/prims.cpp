#include <bits/stdc++.h>
using namespace std;

int prim(int V, vector<vector<pair<int,int>>> &adj) {

    priority_queue<
        pair<int,int>, 
        vector<pair<int,int>>, 
        greater<pair<int,int>>
    > pq;

    vector<bool> visited(V, false);

    int totalWeight = 0;

    pq.push(make_pair(0, 0));

    while(!pq.empty()) {

        pair<int,int> top = pq.top();
        pq.pop();

        int weight = top.first;
        int node = top.second;

        if(visited[node])
            continue;

        visited[node] = true;
        totalWeight += weight;

        for(int i = 0; i < adj[node].size(); i++) {

            int adjWeight = adj[node][i].first;
            int adjNode = adj[node][i].second;

            if(!visited[adjNode]) {
                pq.push(make_pair(adjWeight, adjNode));
            }
        }
    }

    return totalWeight;
}
int main(){

    return 0;
}