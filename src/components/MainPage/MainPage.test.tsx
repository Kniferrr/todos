import { render, fireEvent } from "@testing-library/react";
import MainPage from "./MainPage";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";

describe("MainPage", () => {
  it("renders the component without errors", () => {
    const { getByText, getByPlaceholderText } = render(<MainPage />);

    // Проверяем наличие элементов на странице
    const headerElement = getByText("ToDo List");
    const inputElement = getByPlaceholderText("Add a new task");
    const addButton = getByText("Add");

    expect(headerElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it("allows adding a new task", () => {
    const { getByPlaceholderText, getByText } = render(<MainPage />);

    const inputElement = getByPlaceholderText("Add a new task");
    const addButton = getByText("Add");

    // Вводим текст в поле ввода и нажимаем кнопку "Add"
    fireEvent.change(inputElement, { target: { value: "Test Task" } });
    fireEvent.click(addButton);

    // Проверяем, что текст задачи появился в списке
    const taskElement = getByText("Test Task");
    expect(taskElement).toBeInTheDocument();
  });

  it("allows filtering tasks by All, Completed, and Incomplete", () => {
    const { getByText } = render(<MainPage />);

    // Проверяем, что все кнопки фильтрации присутствуют на странице
    const allButton = getByText("All Tasks");
    const completedButton = getByText("Completed");
    const incompleteButton = getByText("Incomplete");

    expect(allButton).toBeInTheDocument();
    expect(completedButton).toBeInTheDocument();
    expect(incompleteButton).toBeInTheDocument();

    // Проверяем, что активной является кнопка "All Tasks" по умолчанию
    expect(allButton).toHaveClass("active");

    // Нажимаем кнопку "Completed" и проверяем, что она стала активной
    fireEvent.click(completedButton);
    expect(completedButton).toHaveClass("active");

    // Нажимаем кнопку "Incomplete" и проверяем, что она стала активной
    fireEvent.click(incompleteButton);
    expect(incompleteButton).toHaveClass("active");
  });
});
