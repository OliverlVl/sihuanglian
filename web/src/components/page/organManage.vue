<template>
<div class="handle-box">
    <span class="demonstration">选择院校</span>
    <el-cascader
        v-model="value"
        :options="options"
        @change="onChange"></el-cascader>
</div>
</template>
<script>
    export default {
        data() {
            return {
                value: [],
                options: [{
                    value: '福州大学',
                    label: '福州大学',
                    children: [{
                        value: '数计学院',
                        label: '数计学院'
                    }, {
                        value: '经管学院',
                        label: '经管学院',
                    }]
                }, {
                    value: '福建师范大学',
                    label: '福建师范大学',
                    children: [{
                        value: '软件学院',
                        label: '软件学院',
                    }, {
                        value: '电子学院',
                        label: '电子学院',
                    }]
                } ]
            };
        },
        methods: {
            onChange(value) {
                console.log(value);
                
            }
        }
    };
</script>
