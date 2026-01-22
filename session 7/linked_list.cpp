#include<iostream>
using namespace std;
struct Node{
    Node* next;
    int data;
    Node(int val){
        data = val;
        next = NULL;
    }
};
void insertathead(Node* &head  , int val){
    Node* temp = new Node(val);
    temp->next= head;
    head = temp;
}

void insertattail(Node* &head , int val){
    Node* newnode = new Node(val);
    if(head==NULL){
        head=newnode;
    }
    Node* temp = head;
    while(temp->next!=NULL){
        temp = temp->next;
    }
    temp->next = newnode;
}
void insertatpos(Node* & head , int pos , int val){
    if(pos  == 1){
        insertathead(head , val);
        return ;
    }
    Node* temp = head;
    int count =1;
    while(temp!=NULL && count < pos-1){
        temp = temp->next;
        count ++;
    }
    Node* newnode = new Node(val) ;
    newnode->next = temp->next;
    temp->next =newnode;
}
void deleteathead(Node* &head){
    if(head==NULL)return;
    Node* temp = head;
    head= head->next;
    delete temp;
}
void deleteatmid(Node* &head, int x){
    if(head == NULL) return;
    if(head->data == x){
        Node* temp = head;
        head = head->next;
        delete temp;
        return;
    }
    Node* curr = head;
    while(curr->next != NULL && curr->next->data != x){
        curr = curr->next;
    }
    if(curr->next == NULL){
        cout << "Value not found\n";
        return;
    }
    Node* nodetodel = curr->next;
    curr->next = nodetodel->next;
    delete nodetodel;
}
void deleteattail(Node* & head){
    if(head == NULL){
        return ;
    }
    if(head->next == NULL){
        delete head;
        head = NULL;
        return ;
    }
    Node* temp =head;
    while(temp->next->next!= NULL){
        temp= temp->next;
    }
    Node* newnode  = temp->next;
    temp->next = newnode->next;
    delete newnode;
}
void display(Node* head){
    while(head!=NULL){
        cout<<head->data<<" ";
        head= head->next;
    }
    cout<<"NULL"<<endl;
}
int main(){
    Node* head = NULL;
    insertathead(head , 5);
    insertathead(head , 15);
    insertathead(head , 25);
    insertattail(head , 50);
    insertattail(head , 60);
    display(head);
    deleteathead(head);
    display(head);
    insertatpos(head , 3 , 67);
    insertatpos(head , 2 , 97);
    display(head);
    deleteathead(head);
    display(head);
    deleteatmid(head , 50);
    display(head);
    deleteattail(head);
    display(head);
    return 0;
}