<template>
  <div>
    <div class="head">
      <div class="language">
        <el-dropdown style="margin-right: 5%" @command="switchLocale">
          <span class="el-dropdown-link">
            {{ $t("lang") }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="'en'">English</el-dropdown-item>
              <el-dropdown-item :command="'zh'">简体中文</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="filter">
        <el-form :inline="true">
          <el-form-item :label="$t('keyword')">
            <el-input :placeholder="$t('placeholder')" v-model="keyword" />
          </el-form-item>
          <el-form-item :label="$t('contestNumber')">
            <el-input-number
              v-model="contestIndex"
              :min="0"
              :max="9999"
              :controls="false"
              style="width: 80px"
            />
          </el-form-item>
          <el-form-item :label="$t('ratingInterval')">
            <el-input-number
              v-model="left"
              :min="0"
              :max="9999"
              :controls="false"
              style="width: 80px"
            />
          </el-form-item>
          <el-form-item> -</el-form-item>
          <el-form-item>
            <el-input-number
              v-model="right"
              :min="0"
              :max="9999"
              :controls="false"
              style="width: 80px"
            />
          </el-form-item>
          <el-form-item>
            <el-switch
              v-model="asc"
              :active-text="$t('asc')"
              :inactive-text="$t('desc')"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query"
              >{{ $t("query") }}
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="reset"
              >{{ $t("reset") }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="problemSetShow"
        border
        stripe
        style="width: 90%"
        :table-layout="'auto'"
      >
        <el-table-column prop="ID" label="ID" width="180" />
        <el-table-column :label="$t('problemName')">
          <template #default="scope">
            <el-link
              :href="scope.row.ProblemHrefZH"
              target="_blank"
              v-if="locale === 'zh'"
              >{{ scope.row.TitleZH }}
            </el-link>
            <el-link :href="scope.row.ProblemHrefEN" target="_blank" v-else
              >{{ scope.row.Title }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('contestName')">
          <template #default="scope">
            <el-link
              :href="scope.row.ContestHrefZH"
              target="_blank"
              v-if="locale === 'zh'"
              >{{ scope.row.ContestID_zh }}
            </el-link>
            <el-link :href="scope.row.ContestHrefEN" target="_blank" v-else
              >{{ scope.row.ContestID_en }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="ProblemIndex" label="#" />
        <el-table-column :label="$t('rating')">
          <template #default="scope">
            {{ formatNumber(scope.row.Rating) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        :page-sizes="[10, 15, 20, 30, 40, 50, 100]"
        v-model:page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="filterProblemSet.length"
        v-model:current-page="currentPage"
        @current-change="currentChange"
        @size-change="sizeChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import axios, { AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";

const url = "https://zerotrac.github.io/leetcode_problem_rating/data.json";

interface Problem {
  ContestID_en: string;
  ContestID_zh: string;
  ContestSlug: string;
  ID: number;
  ProblemIndex: string;
  Rating: number;
  Title: string;
  TitleSlug: string;
  TitleZH: string;
  ProblemHrefZH: string | null;
  ProblemHrefEN: string | null;
  ContestHrefEN: string | null;
  ContestHrefZH: string | null;
}

let i18n = useI18n();
let locale = i18n.locale;
let asc = ref(false);
let left = ref(null);
let right = ref(null);
const pageSizeCache = localStorage.getItem("pageSize");

let pageSize = ref(pageSizeCache ? parseInt(pageSizeCache) : 15);
let contestIndex = ref(null);
const problemSetAll: Array<Problem> = reactive([]);
const problemSetShow: Array<Problem> = reactive([]);
const filterProblemSet: Array<Problem> = reactive([]);
let keyword = ref("");
let currentPage = ref(1);
onMounted(() => {
  axios.get(url).then((res: AxiosResponse<Array<Problem>>) => {
    const problems = res.data;
    problems.forEach((item) => {
      item.ProblemHrefZH = "https://leetcode.cn/problems/" + item.TitleSlug;
      item.ProblemHrefEN = "https://leetcode.com/problems/" + item.TitleSlug;
      item.ContestHrefZH = "https://leetcode.cn/contest/" + item.ContestSlug;
      item.ContestHrefEN = "https://leetcode.com/contest/" + item.ContestSlug;
      problemSetAll.push(item);
      filterProblemSet.push(item);
    });
    currentChange();
  });
});

function switchLocale(locale: string) {
  i18n.locale.value = locale;
  localStorage.setItem("locale", locale);
}

function formatNumber(rating: number) {
  return Math.floor(rating);
}

function currentChange() {
  problemSetShow.length = 0;
  let no = currentPage.value;
  let size = pageSize.value;
  let total = filterProblemSet.length;
  for (let i = (no - 1) * size; i < Math.min(total, no * size); i++) {
    problemSetShow.push(filterProblemSet[i]);
  }
}

function sizeChange() {
  currentPage.value = 1;
  localStorage.setItem("pageSize", String(pageSize.value));
  currentChange();
}

function query() {
  if (left.value != null && right.value != null && right.value < left.value) {
    ElMessage.error({
      message: "left must less than right",
      duration: 1000,
    });
    return;
  }
  filterProblemSet.length = 0;
  problemSetAll.forEach((item) => {
    if (keyword.value.trim().length > 0) {
      let k = keyword.value.trim();
      if (
        !item.TitleZH.includes(k) &&
        !item.Title.includes(k) &&
        !item.TitleSlug.includes(k)
      ) {
        return;
      }
    }
    if (contestIndex.value != null) {
      let index = parseInt(item.ContestSlug.replace(/\D/gi, ""));
      if (index != contestIndex.value) {
        return;
      }
    }
    if (left.value != null && item.Rating < left.value) {
      return;
    }
    if (right.value != null && item.Rating > right.value) {
      return;
    }
    filterProblemSet.push(item);
  });
  if (asc.value) {
    filterProblemSet.reverse();
  }
  sizeChange();
}

function reset() {
  asc.value = false;
  keyword.value = "";
  contestIndex.value = null;
  left.value = null;
  right.value = null;
  query();
}
</script>

<style scoped>
.filter {
  margin-left: 5%;
  width: 90%;
  margin-top: 20px;
  display: flex;
}

.content {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.footer {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.head {
  display: flex;
  flex-direction: column;
}

.language {
  width: 100%;
  display: flex;
  justify-content: right;
}
</style>
