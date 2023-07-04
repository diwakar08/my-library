#include<bits/stdc++.h>
using namespace std;

struct stack1{
  int capacity = 2;
  int top = -1;
  int *array;
};

void push(stack1 *&s1)
{
  int data;
  cout<<"enter the data\n";
  cin>>data;
  if(s1->top==s1->capacity-1)
  {
    cout<<"size changed\n";
    s1->array = (int *)realloc(s1->array,s1->capacity*2);
    s1->capacity*=2;
  }
  s1->top++;
  s1->array[s1->top]=data;
}

int pop(stack1 *&s1)
{
  if(s1->top==-1){cout<<"stack is empty";return -1;}
  int val = s1->array[s1->top];
  s1->top--;
  return val;
}

void full(stack1 *s1)
{
  if(s1->top!=(s1->capacity-1)){cout<<"stack is not full\n";}
  else cout<<"stack is full\n";
}

void empty(stack1 *s1)
{
  if(s1->top!=-1){cout<<"stack is not empty\n";}
  else cout<<"stack is empty\n";
}

void size(stack1 *s1)
{
  cout<<"the size of the stack is" << (s1->top+1)<<endl;
}

void top(stack1 *s1)
{
  if(s1->top==-1){cout<<"stack is empty";}
  else 
  {
    cout<<"top element is" << s1->array[s1->top]<<endl;
  }
}

void print(stack1 *&s1)
{
  if(s1->top==-1){cout<<"stack is empty";return;}
  for(int i=0;i<=s1->top;i++)
    cout<<s1->array[i]<<" ";
  cout<<endl;
}
