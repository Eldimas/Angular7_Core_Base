import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';

/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
export class FileNode {
  childGroups: FileNode[];
  name: string;
  expanded: boolean;
  id: string;
  selected: boolean;
}

/**
 * The Json tree data in string. The data could be parsed into Json object
 */
const TREE_DATA = [
  {
  'name': 'Group 1',
  'expanded': false,
  'id': '1',
  'selected': false,
  'childGroups': [
    {
      'name': 'Childgroup 1',
      'expanded': false,
      'id': '2',
      'selected': true,
      'childGroups': []
    },
    {
      'name': 'Childgroup 2',
      'expanded': false,
      'id': '3',
      'selected': false,
      'childGroups': [
        {
          'name': 'Child of child',
          'expanded': false,
          'id': '4',
          'selected': false,
          'childGroups': []
        }
      ]
    }
    ]
  },
    {
  'name': 'Group 2',
  'expanded': false,
  'id': '5',
  'selected': false,
  'childGroups': [
    {
      'name': 'Childgroup 1',
      'expanded': false,
      'id': '6',
      'selected': false,
      'childGroups': []
    },
    {
      'name': 'Childgroup 2',
      'expanded': false,
      'id': '7',
      'selected': false,
      'childGroups': [
        {
          'name': 'Child of child',
          'expanded': false,
          'id': '8',
          'selected': true,
          'childGroups': []
        }
      ]
    }
    ]
  },
    {
  'name': 'Group 3',
  'expanded': false,
  'id': '9',
  'selected': false,
  'childGroups': [
    {
      'name': 'Childgroup 1',
      'expanded': false,
      'id': '10',
      'selected': false,
      'childGroups': []
    },
    {
      'name': 'Childgroup 2',
      'expanded': false,
      'id': '11',
      'selected': false,
      'childGroups': [
        {
          'name': 'Child of child',
          'expanded': false,
          'id': '12',
          'selected': false,
          'childGroups': []
        }
      ]
    }
    ]
  },
];

@Component({
  selector: 'app-navtree01',
  templateUrl: './navtree01.component.html',
  styleUrls: ['./navtree01.component.scss']
})
export class Navtree01Component {
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  checklistSelection = new SelectionModel<FileNode>(true /* multiple */);

  constructor() {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.nestedDataSource.data = TREE_DATA;
  }

  hasNestedChild = (_: number, nodeData: FileNode) => nodeData.childGroups.length > 0;

  private _getChildren = (node: FileNode) => node.childGroups;

  // tslint:disable-next-line:typedef
  changeState(node) {
    node.expanded = !node.expanded;
    console.log(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: FileNode): void {
    // alert(node.selected);
    console.log('before', node);
    // this.checklistSelection.toggle(node);
    node.selected = !node.selected;
    console.log('after', node);
    
    // this.checkAllParentsSelection(node);
    
  }

}
