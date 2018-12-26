import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';


/**
 * Node for to-do item
 */
// export class TodoItemNode {
//   children: TodoItemNode[];
//   item: string;
// }

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

//#region Old TREE_DATA
/**
 * The Json object for to-do list data.
 */
// const TREE_DATA = {
//   Groceries: {
//     'Almond Meal flour': null,
//     'Organic eggs': null,
//     'Protein Powder': null,
//     Fruits: {
//       Apple: null,
//       Berries: ['Blueberry', 'Raspberry'],
//       Orange: null
//     }
//   }
  // ,
  // Reminders: [
  //   'Cook dinner',
  //   'Read the Material Design spec',
  //   'Upgrade Application to Angular'
  // ]
// };
//#endregion

export class TodoItemNode {
  childGroups: TodoItemNode[];
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
      'childGroups': ''
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

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  // tslint:disable-next-line:typedef
  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: any, level: number): TodoItemNode[] {
    console.log('obj: ', obj);
    

    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      // node.name = key;
      node.name = value.name;
      console.log('value: ', value);
      console.log('key: ', key);
      console.log('accumulator: ', accumulator);
      

      if (value != null) {
        if (typeof value === 'object' && value.childGroups.length > 0) {
          node.childGroups = this.buildFileTree(value.childGroups, level + 1);
        } else {
          node.name = value.name;
        }
      }
        console.log('accumulator.concat(node): ', accumulator.concat(node));
        
      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  // tslint:disable-next-line:typedef
  insertItem(parent: TodoItemNode, tdItem: TodoItemNode) {
    if (parent.childGroups) {
      parent.childGroups.push(tdItem);
      this.dataChange.next(this.data);
    }
  }

  // tslint:disable-next-line:typedef
  updateItem(node: TodoItemNode, name: string) {
    // node.item = name;
    this.dataChange.next(this.data);
    console.log('data: ', this.data);
    
  }
}

@Component({
  selector: 'app-navtree02',
  templateUrl: './navtree02.component.html',
  styleUrls: ['./navtree02.component.scss'],
  providers: [ChecklistDatabase]
})
export class Navtree02Component {

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

/** Map from nested node to flattened node. This helps us to keep the same object for selection */
nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

/** A selected parent node to be inserted */
selectedParent: TodoItemFlatNode | null = null;

/** The new item's name */
newItemName = '';

treeControl: FlatTreeControl<TodoItemFlatNode>;

treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

/** The selection for checklist */
checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

constructor(private database: ChecklistDatabase) {
  this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
    this.isExpandable, this.getChildren);
  this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
  this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  database.dataChange.subscribe(data => {
    this.dataSource.data = data;
  });
}

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.childGroups;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';


  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.name
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.childGroups;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }


  /** Select the category so we can insert the new item. */
  // tslint:disable-next-line:typedef
  addNewItem(node: TodoItemFlatNode) {
    console.log('TodoItemFlatNode: ', node);
    
    const parentNode = this.flatNodeMap.get(node);
    console.log('parentNode: ', parentNode);

    const tdNode = new TodoItemNode();
      tdNode.name = '';
      tdNode.expanded = false;
      tdNode.id = '99';
      tdNode.selected = false; 
      tdNode.childGroups = [];
    
    
    // tslint:disable-next-line:no-non-null-assertion
    // this.database.insertItem(parentNode!, '');
    // tslint:disable-next-line:no-non-null-assertion
    this.database.insertItem(parentNode!, tdNode);
    this.treeControl.expand(node);
    // console.log('node: ', node);
    
  }

  /** Save the node to database */
  // tslint:disable-next-line:typedef
  saveNode(node: TodoItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    // tslint:disable-next-line:no-non-null-assertion
    this.database.updateItem(nestedNode!, itemValue);
  
  }

}
