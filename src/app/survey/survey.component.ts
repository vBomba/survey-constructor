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
  surveyForm: FormGroup;
  QuestionType: typeof QuestionType = QuestionType;
  surveyQuestions: Question[] = [
    {
      id: 1,
      type: QuestionType.Radio,
      question: 'What is your favorite color?',
      value: 'red',
      options: [
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
      ],
      nextQuestionId: 2,
    },
    {
      id: 2,
      type: QuestionType.Checkbox,
      question: 'Which of the following pets do you have?',
      value: 'dog',
      options: [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'bird', label: 'Bird' },
        { value: 'fish', label: 'Fish' },
      ],
      nextQuestionId: 3,
    },
    {
      id: 3,
      type: QuestionType.Text,
      question: 'What is your favorite food?',
      nextQuestionId: 4,
      value: 'test',
    },
    {
      id: 4,
      type: QuestionType.Select,
      question: 'Which of the following pets do you have?',
      value: 'dog',
      options: [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'bird', label: 'Bird' },
        { value: 'fish', label: 'Fish' },
      ],
      nextQuestionId: 3,
    },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.surveyForm = this.formBuilder.group({});

    this.surveyQuestions.forEach((question) => {
      if (question.type === QuestionType.Checkbox) {
        this.surveyForm.addControl(
          question.id + '',
          this.formBuilder.array([])
        );

        question.options!.map((option, i) => {
          (this.surveyForm.get([question.id + '']) as any).push(
            new FormControl(
              option
              // `${question.id}_${i}`,
              // this.formBuilder.control(option)
            )
          );
        });
      } else {
        this.surveyForm.addControl(
          question.id + '',
          this.formBuilder.control(question.value ?? null)
          // this.formBuilder.control(null, validators)
        );
      }
    });
  }

  onSubmit() {
    const surveyResults = this.surveyForm.value;
    console.log(surveyResults);
  }
}
