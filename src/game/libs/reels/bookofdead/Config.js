import Icon from "../rheel/Icon"
import IconBird from "./IconBird"
import IconWolf from "./IconWolf"
import IconPharao from "./IconPharao"
import IconMan from "./IconMan"
import IconBook from "./IconBook"
import IconFeature from "./IconFeature"
import IconFeaturePic from "./IconFeaturePic"

import GradientLine from "../rheel/GradientLine"
import TWEEN from "@tweenjs/tween.js";


var Config = {
    items: [
        {
            id: 0,
            name: "10",
            itemClass: Icon,
            itemFeatureClass: IconFeature,
            featureIconOffset: 10,
            itemOrigin: 'allIcons/icon0000',
            itemRotate: 'allIcons/icon0001',
            itemAnimate: "icon0_animFr"
        },
        {
            id: 1,
            name: "J",
            itemClass: Icon,
            itemFeatureClass: IconFeature,
            featureIconOffset: 9,
            itemOrigin: 'allIcons/icon0002',
            itemRotate: 'allIcons/icon0003',
            itemAnimate: "icon1_animFr"
        },
        {
            id: 2,
            name: "Q",
            itemClass: Icon,
            itemFeatureClass: IconFeature,
            featureIconOffset: 8,
            itemOrigin: 'allIcons/icon0004',
            itemRotate: 'allIcons/icon0005',
            itemAnimate: "icon2_animFr"
        },
        {
            id: 3,
            name: "K",
            itemClass: Icon,
            itemFeatureClass: IconFeature,
            featureIconOffset: 7,
            itemOrigin: 'allIcons/icon0006',
            itemRotate: 'allIcons/icon0007',
            itemAnimate: "icon3_animFr"
        },
        {
            id: 4,
            name: "A",
            itemClass: Icon,
            itemFeatureClass: IconFeature,
            featureIconOffset: 6,
            itemOrigin: 'allIcons/icon0008',
            itemRotate: 'allIcons/icon0009',
            itemAnimate: "icon4_animFr"
        },
        {
            id: 5,
            name: "Bird",
            itemClass: IconBird,
            itemFeatureClass: IconFeaturePic,
            itemOrigin: 'allIcons/icon0010',
            itemRotate: 'allIcons/icon0011',
        },
        {
            id: 6,
            name: "Wolf",
            itemClass: IconWolf,
            itemFeatureClass: IconFeaturePic,
            itemOrigin: 'allIcons/icon0012',
            itemRotate: 'allIcons/icon0013',
        },
        {
            id: 7,
            name: "Pharao",
            itemClass: IconPharao,
            itemFeatureClass: IconFeaturePic,
            itemOrigin: 'allIcons/icon0014',
            itemRotate: 'allIcons/icon0015',
        },
        {
            id: 8,
            name: "Man",
            itemClass: IconMan,
            itemFeatureClass: IconFeaturePic,
            itemOrigin: 'allIcons/icon0016',
            itemRotate: 'allIcons/icon0017',
        },
        {
            id: 9,
            name: "Book",
            itemClass: IconBook,
            itemFeatureClass: IconFeaturePic,
            itemOrigin: 'allIcons/icon0018',
            itemRotate: 'allIcons/icon0019',
        }
    ],

    lines: [],
    lineClass: GradientLine,
    lineColors: [0x3347a7, 0x4560e2, 0x587aff, 0x6b95ff, 0x7fb0ff, 0x8bc1ff],


    itemHeight: 222,
    itemWidth: 244,

    rotateSpeed: 200,
    rheelHeight: 3,
    featureIcon: -1,
    offset: {
        up: {
            height: 0,
            time: 0,
            tween: TWEEN.Easing.Quadratic.Out,
            endDelay: 0
        },
        down: {
            height: 70,
            time: 450,
            tween: TWEEN.Easing.Back.Out,
            endDelay: 0
        }
    },
    LOG:true
}

export default Config