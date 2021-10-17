import handlebars from 'handlebars';

interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariables;
}

export default class HandlebarsMailTemplate {
  public async parseVariablesToTemplate({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
