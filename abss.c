#include<stdio.h>

void bubbleSort(int *arr, int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
void swap(int* arr1, int *arr2, int index1, int index2) {
    int temp = arr1[index1];
    arr1[index1] = arr2[index2];
    arr2[index2] = temp;
}
int organize_pos_neg(int *a1, int *a2, int size) {
    int a=0,b=0;
    while(a!=size) {
        while(a<size && a1[a]>0) {
            a++;
        }
        while(b<size && a2[b]<0) {
            b++;
        }
        if(a<size) {
            swap(a1,a2,a,b);     //is line me change h 
            a++;
            b++;
        }
    }
    bubbleSort(a1, size);
    bubbleSort(a2, size);
    return 1;
}
int sum_of_single_digits(char n1, char n2) {
    int ans = (n1-'0')+(n2-'0');
    return ans;
}
int check_isogram(char str[]) {
    int ans=0 ;
    int count[256] = {0};  
    int index =-1;
    for (int i = 0; str[i] != '\0'; i++) {
        char ch = str[i];
        int x = (int)ch;
        ans+=x;
        if (count[ch] > 0) {
           index=i;
           break;
        }
        count[ch]++;
    }
    if(index>=0)return index;
    return ans;
}
int main() {
    char ch ='a';
    char str[] = {"computer"};
    int x=check_isogram(str);
//     x = sum_of_single_digits('5', '6');
    printf("%d",x);
// int bb = 5;
//     int *a1 = &x;
//     int *b1=&bb;
//     swap(a1,b1);
//     printf("%d %d",*a1,*b1);
}