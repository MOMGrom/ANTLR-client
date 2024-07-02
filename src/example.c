#include <stdio.h>

int main() {
    // Объявление переменных
    int i;
    int limit = 10;
    int value = 7;

    // Первое условие вне цикла: проверка, больше ли значение переменной value 5
    if (value > 5) {
        printf("The value %d is greater than 5\n", value);
    }
    else {
        printf("The value %d is not greater than 5\n", value);
    }

    // Второе условие вне цикла: проверка, равно ли значение переменной limit 10
    if (limit == 10) {
        printf("The limit is 10\n");
    }
    else {
        printf("The limit is not 10\n");
    }

    // Цикл for, который будет повторяться от 0 до 9
    for (i = 0; i < limit; i++) {
        // Условие if для проверки, является ли текущее значение переменной i четным
        if (i % 2 == 0) {
            printf("%d is even\n", i); // Выводим, что число четное
        }
        else {
            printf("%d is odd\n", i); // Выводим, что число нечетное
        }
    }

    int iterator = 10;
    while (iterator > 0) {
        printf("Iterator value %d\n", iterator);
        iterator--;
    }

    iterator = 10;
    do {
        iterator--;
        printf("Iterator value %d\n", iterator);
    } while (iterator > 0);

    return 0;
}