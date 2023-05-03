import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { QuestionType } from '../models/question-type';
import { Question } from '../models/question-model';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    BrowserModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class SurveyComponent {
  QuestionType: typeof QuestionType = QuestionType;
  surveyForm: FormGroup;

  submittedValue: any;
  surveyQuestions: Question[] = [
    {
      id: '1',
      type: QuestionType.Radio,
      question: 'What is your favorite color?',
      value: 'red',
      options: [
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
      ],
      nextQuestionId: '2',
    },
    {
      id: '2',
      type: QuestionType.MultipleCheckbox,
      question: 'Which of the following pets do you have?',
      value: ['dog'],
      options: [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'bird', label: 'Bird' },
        { value: 'fish', label: 'Fish' },
      ],
      nextQuestionId: '3',
    },
    {
      id: '3',
      type: QuestionType.Text,
      question: 'What is your favorite food?',
      nextQuestionId: '4',
      value: 'test',
    },
    {
      id: '4',
      type: QuestionType.Select,
      question: 'Which of the following pets do you have?',
      value: 'dog',
      options: [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'bird', label: 'Bird' },
        { value: 'fish', label: 'Fish' },
      ],
      nextQuestionId: '5',
    },
    {
      id: '5',
      type: QuestionType.MultipleSelect,
      question: 'Which of the following pets do you have?',
      value: ['dog'],
      options: [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'bird', label: 'Bird' },
        { value: 'fish', label: 'Fish' },
      ],
      nextQuestionId: '6',
    },
    {
      id: '6',
      type: QuestionType.Checkbox,
      question: 'This single checkbox work correct?',
      value: true,
      options: [
        { value: 'corect', label: 'Correct' },
        { value: 'not-correct', label: 'Correct' },
      ],
      nextQuestionId: '3',
    },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.surveyForm = this.formBuilder.group({});

    this.surveyQuestions.forEach((question) => {
      switch (question.type) {
        case QuestionType.MultipleCheckbox:
          this.surveyForm.addControl(
            question.id,
            this.formBuilder.array(
              question.options!.map((o) => {
                return new FormControl(
                  (question.value as string[]).includes(o.value)
                );
              })
            )
          );

          break;

        default:
          this.surveyForm.addControl(
            question.id,
            this.formBuilder.control(question.value ?? null)
          );
      }
    });
  }

  onSubmit(): void {
    const surveyResults = this.surveyForm.value;

    this.surveyQuestions.forEach((q, i) => {
      if (q.type === QuestionType.MultipleCheckbox) {
        surveyResults[q.id] = surveyResults[q.id]
          .map((v: boolean | null, i: number) => {
            return v ? q.options![i].value : '';
          })
          .filter(Boolean);
      }

      if (q.type === QuestionType.Checkbox) {
        surveyResults[q.id] = surveyResults[q.id]
          ? this.surveyQuestions[i].options![0].value
          : this.surveyQuestions[i].options![1].value;
      }
    });

    this.submittedValue = surveyResults;
  }
}
