<template>
  <div class="crud-container">
    <el-row>
      <el-col :span="24">
        <el-form ref="search" label-position="left" label-width="auto">
          <el-form-item label="Filter Prefix">
            <el-input :disabled="!this.users.length" v-model="filter" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">
        Users
        <div class="name" @click="select($event, item, i)" v-for="(item, i) in filteredItems" :key="i">
          {{item}}
        </div>
      </el-col>
      <el-col :span="10">
        <el-form ref="entry" :model="user" label-position="left" label-width="auto">
          <el-form-item label="First Name">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="Last Name">
            <el-input v-model="user.surname"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-button icon="el-icon-plus" :disabled="!user.name || !user.surname || itemSelected" type="primary" @click="createUser">Create</el-button>
      </el-col>
      <el-col :span="8">
        <el-button icon="el-icon-edit" :disabled="!itemSelected" type="warning" @click="updateUser">Update</el-button>
      </el-col>
      <el-col :span="8">
        <el-button icon="el-icon-close" :disabled="!itemSelected" type="danger" @click="deleteUser">Delete</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'crud',
  computed: {
    itemSelected: {
      get() {
        if(typeof(this.selectedIndex) !== 'undefined') {
          return true;
        }
        return false;
      }
    },
    filteredItems: {
      get() {
        if(!this.users.length) {
          return []
        }
        const results = this.users.filter((usr) => {
          return usr.toLowerCase().startsWith(this.filter.toLowerCase());
        });
        if(results.length) {
          return results
        } else {
          return []
        }
      },
    }
  },
  data() {
    return {
      filter: '',
      user: {
        name: '',
        surname: '',
      },
      selectedIndex: undefined,
      users: [],
    };
  },
  methods: {
    createUser() {
      this.users.push(`${this.user.surname}, ${this.user.name}`);
      this.user.name = '';
      this.user.surname = '';
    },
    updateUser() {
      this.users.splice(this.selectedIndex, 1, `${this.user.surname}, ${this.user.name}`);
      this.user.name = '';
      this.user.surname = '';
      this.selectedIndex = undefined;
      const select = document.querySelector('.selected');
      select.classList.remove('selected');
    },
    deleteUser() {
      this.users.splice(this.selectedIndex, 1);
      this.user.name = '';
      this.user.surname = '';
      this.selectedIndex = undefined;
      const select = document.querySelector('.selected');
      select.classList.remove('selected');
    },
    select(evt, item, i) {
      if(!this.itemSelected) {
        this.selectedIndex = i;
        const name = item.split(',');
        const first = name[1].trim();
        const sur = name[0].trim();
        this.user.name = first;
        this.user.surname = sur;
        evt.srcElement.classList.add('selected');
      } else {
        this.selectedIndex = undefined;
        this.user.name = '';
        this.user.surname = '';
        evt.srcElement.classList.remove('selected');
      }
    },
  }
}
</script>

<style scoped>
  .crud-container {
    margin: 20px 25%;
  }
  .name {
    text-align: left;
    margin: 0 5px;
    padding: 5px;
    cursor: pointer;
  }
  .name.selected {
    text-align: left;
    margin: 0 5px;
    padding: 5px;
    font-weight: bold;
  }
  .name:hover {
    background-color: #efefef;
  }
</style>