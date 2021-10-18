import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  fileTemplate: string;
  variables: ITemplateVariables;
}

export default class HandlebarsMailTemplate {
  public async parseVariablesToTemplate({
    fileTemplate,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(fileTemplate, {
      encoding: 'utf8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
