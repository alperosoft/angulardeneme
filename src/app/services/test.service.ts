import { Injectable } from '@angular/core';
export const directions = {
  auto: {
    icon: 'rowfield',
    shading: true,
    position: {
      of: '#grid',
      my: 'right bottom',
      at: 'right bottom',
      offset: '-16 -16',
    },
  },
  up: {
    icon: 'rowfield',
    shading: true,
    direction: 'up',
    position: {
      of: '#grid',
      my: 'right bottom',
      at: 'right bottom',
      offset: '-16 -16',
    },
  },
  down: {
    icon: 'rowfield',
    shading: true,
    direction: 'down',
    position: {
      of: '.dx-datagrid-rowsview',
      my: 'right top',
      at: 'right top',
      offset: '-16 16',
    },
  },
};

export class Employee {
  ID: number;

  FirstName: string;

  LastName: string;

  Prefix: string;

  Position: string;

  BirthDate: string;

  HireDate: string;

  Notes: string;

  Address: string;

  StateID: number;
}

export class State {
  ID: number;

  Name: string;
}

const employees: Employee[] = [{
  ID: 1,
  FirstName: 'John',
  LastName: 'Heart',
  Prefix: 'Mr.',
  Position: 'CEO',
  BirthDate: '1964/03/16',
  HireDate: '1995/01/15',
  Notes: 'John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.',
  Address: '351 S Hill St.',
  StateID: 5,
}, {
  ID: 2,
  FirstName: 'Olivia',
  LastName: 'Peyton',
  Prefix: 'Mrs.',
  Position: 'Sales Assistant',
  BirthDate: '1981/06/03',
  HireDate: '2012/05/14',
  Notes: 'Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.',
  Address: '807 W Paseo Del Mar',
  StateID: 5,
}, {
  ID: 3,
  FirstName: 'Robert',
  LastName: 'Reagan',
  Prefix: 'Mr.',
  Position: 'CMO',
  BirthDate: '1974/09/07',
  HireDate: '2002/11/08',
  Notes: 'Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team.\r\n\r\nRobert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.',
  Address: '4 Westmoreland Pl.',
  StateID: 4,
}, {
  ID: 4,
  FirstName: 'Greta',
  LastName: 'Sims',
  Prefix: 'Ms.',
  Position: 'HR Manager',
  BirthDate: '1977/11/22',
  HireDate: '1998/04/23',
  Notes: "Greta has been DevAV's HR Manager since 2003. She joined DevAV from Sonee Corp.\r\n\r\nGreta is currently training for the NYC marathon. Her best marathon time is 4 hours. Go Greta.",
  Address: '1700 S Grandview Dr.',
  StateID: 10,
} ];

const states: State[] = [{
  ID: 1,
  Name: 'Alabama',
}, {
  ID: 2,
  Name: 'Alaska',
}, {
  ID: 3,
  Name: 'Arizona',
}, {
  ID: 4,
  Name: 'Arkansas',
}, {
  ID: 5,
  Name: 'California',
}, {
  ID: 6,
  Name: 'Colorado',
}, {
  ID: 7,
  Name: 'Connecticut',
}, {
  ID: 8,
  Name: 'Delaware',
}, {
  ID: 9,
  Name: 'District of Columbia',
}, {
  ID: 10,
  Name: 'Florida',
} ];

@Injectable({
  providedIn: 'root',
})
export class Service {
  getEmployees(): Employee[] {
    return employees;
  }

  getStates(): State[] {
    return states;
  }
}
